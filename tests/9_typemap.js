'use strict';

var jsonSqlLib = require('../lib');
var expect = require('chai').expect;


describe('Typemap', function() {


    it('"integer" or "int" should be ok', function() {
        var jsonSql = jsonSqlLib({dialect: 'mssql'});
		var result = jsonSql.dialect.typemap.get('gettype')({type: jsonSql.TYPES.INT});
		expect(result).to.be.equal('int');


        jsonSql = jsonSqlLib({dialect: 'mssql'});
		result = jsonSql.dialect.typemap.get('gettype')({type: jsonSql.TYPES.INT});
		expect(result).to.be.equal('int');


        jsonSql = jsonSqlLib({dialect: 'sqlite'});
		result = jsonSql.dialect.typemap.get('gettype')({type: jsonSql.TYPES.INT});
		expect(result).to.be.equal('integer');

        jsonSql = jsonSqlLib({dialect: 'postgresql'});
		result = jsonSql.dialect.typemap.get('gettype')({type: jsonSql.TYPES.INT, autoincrement: true});
		expect(result).to.be.equal('serial');

	});

    it('"postgresql" "int/serial" should be ok with autoincrement', function() {
        var jsonSql = jsonSqlLib({dialect: 'postgresql'});
		var result = jsonSql.dialect.typemap.get('gettype')({type: jsonSql.TYPES.INT, autoincrement: true});
        var result2 = jsonSql.dialect.typemap.get('gettype')({type: jsonSql.TYPES.INT, autoincrement: false});
		expect(result).to.be.equal('serial');
        expect(result2).to.be.equal('integer');
	});

});
