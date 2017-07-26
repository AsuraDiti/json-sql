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
            case dialect.typemap.get("TYPES").SMALLINT:
            case dialect.typemap.get("TYPES").BIGINT:
            case dialect.typemap.get("TYPES").BOOLEAN:
            case dialect.typemap.get("TYPES").DATE:
                return "integer";
                break;
            case dialect.typemap.get("TYPES").BYTEARRAY:
                return "blob";
                break;
            case dialect.typemap.get("TYPES").CHAR:
            case dialect.typemap.get("TYPES").VARCHAR:
            case dialect.typemap.get("TYPES").TEXT:
            case dialect.typemap.get("TYPES").UUID:
                return "text";
                break;
            case dialect.typemap.get("TYPES").DOUBLE:
            case dialect.typemap.get("TYPES").SINGLE:
                return "real";
                break;
        }




        return sqltype;
    });
}
