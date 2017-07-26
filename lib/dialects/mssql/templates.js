'use strict';


module.exports = function(dialect) {
    var selectTemplate = dialect.templates.get('select');
	selectTemplate.pattern = selectTemplate.pattern.replace('{limit} ', '');
    selectTemplate.pattern = selectTemplate.pattern.replace('{distinct} ', '{distinct} {limit} ');
};
