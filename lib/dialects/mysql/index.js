'use strict';

var BaseDialect = require('../base/index');
var _ = require('underscore');
var util = require('util');

var typemapInit = require('./typemap');
var blocksInit = require('./blocks');

var Dialect = module.exports = function(builder) {
	BaseDialect.call(this, builder);

	// init typemaps
	typemapInit(this);
	// init blocks
	blocksInit(this);
};

util.inherits(Dialect, BaseDialect);

Dialect.prototype.config = _({}).extend(BaseDialect.prototype.config, {
	identifierPrefix: '`',
	identifierSuffix: '`'
});
