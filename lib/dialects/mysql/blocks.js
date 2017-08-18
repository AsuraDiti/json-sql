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
}
