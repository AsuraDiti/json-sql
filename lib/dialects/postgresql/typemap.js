'use strict';

var _ = require('underscore');

module.exports = function(dialect) {

    dialect.typemap.set('gettype', function(params)
    {
        let sqltype = _.isNumber(params.type) ? params.type : params.type.id;
        let sqlArraySize = _.isNumber(params.type) ? 0 : params.type.size;

        if(params.autoincrement)
        {
            switch(sqltype)
            {
                case dialect.typemap.get("TYPES").SMALLINT:
                    return "smallint";
                case dialect.typemap.get("TYPES").INT:
                    return "serial";
                case dialect.typemap.get("TYPES").BIGINT:
                    return "bigserial";
                default:
                    throw "No valid autoincrement type";
            }
        }

        switch(sqltype)
        {
            case dialect.typemap.get("TYPES").INT:
                return "integer";
                break;
            case dialect.typemap.get("TYPES").SMALLINT:
                return "smallint";
                break;
            case dialect.typemap.get("TYPES").BIGINT:
                return "bigint";
                break;
            case dialect.typemap.get("TYPES").BOOLEAN:
                return "boolean";
                break;
            case dialect.typemap.get("TYPES").BYTEARRAY:
                return "bytea";
                break;
            case dialect.typemap.get("TYPES").VARCHAR:
                return "character varying[" + ((sqlArraySize == 0) ? 250 : sqlArraySize) + "]";
                break;
            case dialect.typemap.get("TYPES").CHAR:
                return "character [" + ((sqlArraySize == 0) ? 250 : sqlArraySize) + "]";
                break;
			case dialect.typemap.get("TYPES").NVARCHAR:
                return "character varying[" + ((sqlArraySize == 0) ? 250 : sqlArraySize) + "]";
                break;
            case dialect.typemap.get("TYPES").NCHAR:
                return "character [" + ((sqlArraySize == 0) ? 250 : sqlArraySize) + "]";
                break;
            case dialect.typemap.get("TYPES").DATE:
                return "date";
                break;
			case dialect.typemap.get("TYPES").DATETIME:
                return "time";
                break;
            case dialect.typemap.get("TYPES").DOUBLE:
                return "double precision";
                break;
            case dialect.typemap.get("TYPES").SINGLE:
                return "real";
                break;
            case dialect.typemap.get("TYPES").TEXT:
                return "text";
                break;
            case dialect.typemap.get("TYPES").NTEXT:
                return "ntext";
                break;
            case dialect.typemap.get("TYPES").UUID:
                return "uuid";
                break;
        }




        return sqltype;
    });
}
