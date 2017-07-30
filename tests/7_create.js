'use strict';

var jsonSql = require('../lib')({dialect: 'mssql'});
var expect = require('chai').expect;

describe('Create', function() {
    it('should be ok with a database', function() {
		var result = jsonSql.build({
			type: 'create',
			database: 'test'
		});



		expect(result.query).to.be.equal('create database "test";');
		expect(result.values).to.be.eql({});
	});
    it('should be ok with at least one column', function() {
		var result = jsonSql.build({
			type: 'create',
			table: 'users',
            columnlist: { name: 'id', type: jsonSql.TYPES.INT }
		});



		expect(result.query).to.be.equal('create table "users" ( "id" int );');
		expect(result.values).to.be.eql({});
	});

    it('should be ok with at multiple columns', function() {
		var result = jsonSql.build({
			type: 'create',
			table: 'users',
            columnlist: [ { name: 'id', type: jsonSql.TYPES.INT }, { name:'username', type: jsonSql.TYPES.TEXT}]
		});

		expect(result.query).to.be.equal('create table "users" ( "id" int, "username" text );');
		expect(result.values).to.be.eql({});
	});

    it('should be ok with a primary key', function() {
		var result = jsonSql.build({
			type: 'create',
			table: 'users',
            columnlist: [ { name: 'id', type: jsonSql.TYPES.INT, primary: true }, { name:'username', type: jsonSql.TYPES.TEXT}]
		});

		expect(result.query).to.be.equal('create table "users" ( "id" int primary key, "username" text );');
		expect(result.values).to.be.eql({});
	});

    it('should be ok with a primary key and autoincrement', function() {
		var result = jsonSql.build({
			type: 'create',
			table: 'users',
            columnlist: [ { name: 'id', type: jsonSql.TYPES.INT, primary: true, autoincrement: true, allownull: false }, { name:'username', type: jsonSql.TYPES.TEXT}]
		});

		expect(result.query).to.be.equal('create table "users" ( "id" int primary key identity(1,1) not null, "username" text );');
		expect(result.values).to.be.eql({});
	});

    it('should be ok with a foreignkey', function() {
		var result = jsonSql.build({
			type: 'create',
			table: 'users',
            columnlist: [ { name: 'id', type: jsonSql.TYPES.INT, foreignkey: {"adresses": ["id"]} }, { name:'username', type: jsonSql.TYPES.TEXT}]
		});

		expect(result.query).to.be.equal('create table "users" ( "id" int foreign key references "adresses"("id"), "username" text );');
		expect(result.values).to.be.eql({});
	});

    it('should be ok with a foreignkey as constrain', function() {
		var result = jsonSql.build({
			type: 'create',
			table: 'users',
            columnlist: [ { name: 'id', type: jsonSql.TYPES.INT}, { name:'username', type: jsonSql.TYPES.TEXT}],
            constrainlist: [{ foreignkey: { tablekey: ["id"], other:{"adresses": ["id"]}} }]
		});

		expect(result.query).to.be.equal('create table "users" ( "id" int, "username" text foreign key ( "id" ) references "adresses"("id") );');
		expect(result.values).to.be.eql({});
	});

    it('should be ok with a default value', function() {
		var result = jsonSql.build({
			type: 'create',
			table: 'users',
            columnlist: [ { name: 'id', type: jsonSql.TYPES.INT, default: 0 }, { name: 'username', type: jsonSql.TYPES.TEXT, default: "user" }]
		});

		expect(result.query).to.be.equal('create table "users" ( "id" int default 0, "username" text default \'user\' );');
		expect(result.values).to.be.eql({});
	});

    it('should be ok with a multiple columned primary key value', function() {
		var result = jsonSql.build({
			type: 'create',
			table: 'users',
            columnlist: [ { name: 'id', type: jsonSql.TYPES.INT, default: 0 }, { name: 'username', type: jsonSql.TYPES.TEXT, default: "user" }],
            constrainlist: [{ primary: ['id', 'username']}]
		});

		expect(result.query).to.be.equal('create table "users" ( "id" int default 0, "username" text default \'user\' primary key ( "id", "username" ) );');
		expect(result.values).to.be.eql({});
	});

});
