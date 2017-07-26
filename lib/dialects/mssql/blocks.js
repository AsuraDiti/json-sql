'use strict';

var	_ = require('underscore');

module.exports = function(dialect) {

    dialect.blocks.set('limit', function(params) {
        if (_.isUndefined(params.offset))
        {
            return 'top(' + dialect.builder._pushValue(params.limit) + ')';
        }
        return '';
	});

	dialect.blocks.set('offset', function(params) {
        var sort = '', limit = '';
        if (_.isUndefined(params.sort))
        {
            sort = dialect.buildBlock('sort', { sort: 1 }).trim() + ' ';
        }
        if (!_.isUndefined(params.limit))
        {
            limit = ' fetch next ' + dialect.builder._pushValue(params.limit) + ' rows only';
        }

        return sort + 'offset ' + dialect.builder._pushValue(params.offset) + ' rows' + limit;
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


    dialect.blocks.add('autoincrement', function(params) {
		return params.autoincrement ? 'identity(1,1)' : '';
	});

};
