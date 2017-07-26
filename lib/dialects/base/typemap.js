

module.exports = function(dialect) {
    dialect.typemap.add('TYPES', {
        SMALLINT: 0,
        INT: 1,
        BIGINT: 2,
        BOOLEAN: 3,
        BYTEARRAY: 4,
        VARCHAR: 5,
        CHAR: 6,
        DATE: 7,
        DOUBLE: 8,
        SINGLE: 9,
        TEXT: 10,
        UUID: 11,
		NVARCHAR: 12,
		NCHAR: 13
    });

    dialect.builder.TYPES = dialect.typemap.get('TYPES');

    dialect.typemap.add('gettype', function(params)
    {
        let sqltype = params.type;

        let dialectType = dialect.builder.options.dialect;

        if(dialectType == undefined || dialectType == 'base')
            return params.type;

        params.type
    });
};
