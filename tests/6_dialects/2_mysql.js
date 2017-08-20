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
		it('should be ok with a foreignkey as constraint with name', function() {
			var result = jsonSql.build({
				type: 'create',
				table: 'users',
	            columnlist: [ { name: 'id', type: jsonSql.TYPES.INT}, { name:'username', type: jsonSql.TYPES.TEXT}],
	            constraintlist: [{ constraintname: 'FK_1', foreignkey: { tablekey: ["id"], other:{"adresses": ["id"]}} }]
			});

			expect(result.query).to.be.equal('create table `users` ( `id` int, `username` text, constraint `FK_1` foreign key ( `id` ) references `adresses`(`id`) );');
			expect(result.values).to.be.eql({});
		});
    });
});
