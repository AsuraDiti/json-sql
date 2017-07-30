'use strict';

var jsonSql = require('../lib')();
var expect = require('chai').expect;

describe('Drop', function() {

    it('should be ok with table property', function() {
		var result = jsonSql.build({
			type: 'drop',
			table: 'users'
		});

		expect(result.query).to.be.equal('drop table "users";');
		expect(result.values).to.be.eql({});
	});

    it('should be ok with database property', function() {
		var result = jsonSql.build({
			type: 'drop',
			database: 'test'
		});

		expect(result.query).to.be.equal('drop database "test";');
		expect(result.values).to.be.eql({});
	});
});
