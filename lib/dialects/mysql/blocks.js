var _ = require('underscore');


module.exports = function(dialect) {
    let baseConstraintList = dialect.blocks.get('constraintlist');

    /*dialect.blocks.set('constraintlist', function(params) {
        return ', '+baseConstraintList(params);
    });*/

    let baseColumnList = dialect.blocks.get('columnlist');
    dialect.blocks.set('columnlist', function(params) {
		var result = baseColumnList(params);
		result += (_.isUndefined(params.constraintlist)) ? '':',';
		return result;
	});


    var parentValueBlock = dialect.blocks.get('value');
    dialect.blocks.set('value', function(params) {
		var value = params.value;
        var result;
        if(_.isObject(value) && value instanceof Buffer)
        {
            var placeholder = dialect.builder._getPlaceholder();

			if (dialect.builder.options.namedValues) {
				dialect.builder._values[placeholder] = value;
			} else {
				dialect.builder._values.push(value);
			}

			result = dialect.builder._wrapPlaceholder(placeholder);


        }else if (_.isBoolean(value)){
            params.value = Number(value);
            result = parentValueBlock(params);
        }else {
            result = parentValueBlock(params);
        }

        return result;
	});
}
