'use strict';

var BaseDialect = require('../base/index');
var _ = require('underscore');
var util = require('util');
var blocksInit = require('./blocks');
var templatesInit = require('./templates');
var typemapInit = require('./typemap');

var Dialect = module.exports = function(builder) {
	builder.options.valuesPrefix = '@';
	BaseDialect.call(this, builder);

	// init typemaps
	typemapInit(this);

	// init templates
	templatesInit(this);

	// init blocks
	blocksInit(this);
};

util.inherits(Dialect, BaseDialect);

Dialect.prototype.config = _({}).extend(BaseDialect.prototype.config, {});
