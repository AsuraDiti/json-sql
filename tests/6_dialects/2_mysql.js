'use strict';

var jsonSql = require('../../lib')({
	dialect: 'mysql',
	namedValues: true,
    wrappedIdentifiers: true
});
var expect = require('chai').expect;


describe('MYSQL dialect', function() {
    describe('wrappedIdentifiers', function() {
        it('should be ok with wrappedIdentifiers', function() {
            var result = jsonSql.build({
                type: 'select',
				table: 'users'
			});

			expect(result.query).to.be.equal(
				'select * from `users`;'
			);
			expect(result.values).to.be.eql({});
		});
    });
});
