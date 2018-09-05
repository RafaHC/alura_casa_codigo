var mysql = require('mysql');
var connection;
if (process.env.NODE_ENV == 'test') {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'casa_codigo_test'
    })
} else {

    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'casa_codigo'
    })
}


connection.connect();

function ProdutosDAO() {
    this.lista = function (callback) {
        connection.query('select * from livros', callback)
    }
    this.salva = function (produto, callback) {
        connection.query("INSERT INTO livros SET ?", produto, callback);
    }
    this.resetaBanco = function () {
        connection.query("DELETE FROM LIVROS");
    }


}

module.exports = function () {
    return ProdutosDAO;
}