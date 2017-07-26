'use strict';

var jsonSql = require('../../lib')({
	dialect: 'mssql',
	namedValues: true
});
var expect = require('chai').expect;


describe('MSSQL dialect', function() {
    describe('offset, limit', function() {
        it('should be ok with `limit` property', function() {
            var result = jsonSql.build({
				table: 'users',
				limit: 5
			});

			expect(result.query).to.be.equal(
				'select top(5) * from "users";'
			);
			expect(result.values).to.be.eql({});
		});
        it('should be ok with `offset` property', function() {
            var result = jsonSql.build({
				table: 'users',
				offset: 5
			});

			expect(result.query).to.be.equal(
				'select * from "users" order by 1 offset 5 rows;'
			);
			expect(result.values).to.be.eql({});
		});
        it('should be ok with `offset` and `limit` property', function() {
            var result = jsonSql.build({
				table: 'users',
				offset: 5,
                limit: 6
			});

			expect(result.query).to.be.equal(
				'select  * from "users" order by 1 offset 5 rows fetch next 6 rows only;'
			);
			expect(result.values).to.be.eql({});
		});
    });

    describe('condition value types', function() {
        it('should be ok with `Buffer`', function() {
            var conditionBuffer = new Buffer(12);
            var result = jsonSql.build({
				table: 'users',
				condition:{
                    "testBuffer": {"$eq": conditionBuffer}
                }
			});

			expect(result.query).to.be.equal(
				'select * from "users" where "testBuffer" = @p1;'
			);
			expect(result.values).to.be.eql({"p1": conditionBuffer});
		});
        it('should be ok with `boolean`', function() {
            var condition = true;
            var result = jsonSql.build({
				table: 'users',
				condition:{
                    "testBuffer": {"$eq": condition}
                }
			});

			expect(result.query).to.be.equal(
				'select * from "users" where "testBuffer" = 1;'
			);
			expect(result.values).to.be.eql({});
		});
    });
});
