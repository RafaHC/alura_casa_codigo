let mysql = require('mysql');

module.exports = function () {
    if (!process.env.NODE_ENV) {

        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'casa_codigo'
        })

    }
    if (process.env.NODE_ENV == 'test') {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'casa_codigo_test'
        })
    }
}
