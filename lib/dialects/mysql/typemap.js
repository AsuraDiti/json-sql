'use strict';

var _ = require('underscore');

module.exports = function(dialect) {

    dialect.typemap.set('gettype', function(params)
    {
        let sqltype = _.isNumber(params.type) ? params.type : params.type.id;
        let sqlArraySize = _.isNumber(params.type) ? 0 : params.type.size;

        switch(sqltype)
        {
            case dialect.typemap.get("TYPES").INT:
                return "int";
                break;
            case dialect.typemap.get("TYPES").SMALLINT:
                return "smallint";
                break;
            case dialect.typemap.get("TYPES").BIGINT:
                return "bigint";
                break;
            case dialect.typemap.get("TYPES").BOOLEAN:
                return "tinyint";
                break;
            case dialect.typemap.get("TYPES").BYTEARRAY:
                return "blob";
                break;
            case dialect.typemap.get("TYPES").VARCHAR:
                return "varchar(" + ((sqlArraySize == 0) ? 250 : sqlArraySize) + ")";
                break;
            case dialect.typemap.get("TYPES").CHAR:
                return "char(" + ((sqlArraySize == 0) ? 250 : sqlArraySize) + ")";
                break;
			case dialect.typemap.get("TYPES").NVARCHAR:
                return "nvarchar(" + ((sqlArraySize == 0) ? 250 : sqlArraySize) + ")";
                break;
            case dialect.typemap.get("TYPES").NCHAR:
                return "nchar(" + ((sqlArraySize == 0) ? 250 : sqlArraySize) + ")";
                break;
            case dialect.typemap.get("TYPES").DATE:
                return "date";
                break;
			case dialect.typemap.get("TYPES").DATETIME:
                return "datetime";
                break;
            case dialect.typemap.get("TYPES").DOUBLE:
                return "real";
                break;
            case dialect.typemap.get("TYPES").SINGLE:
                return "float";
                break;
            case dialect.typemap.get("TYPES").TEXT:
                return "text";
                break;
            case dialect.typemap.get("TYPES").NTEXT:
                return "ntext";
                break;
            case dialect.typemap.get("TYPES").UUID:
                return "char(36)";
                break;
        }




        return sqltype;
    });
}
