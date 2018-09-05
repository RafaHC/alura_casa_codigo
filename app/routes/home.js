module.exports = (app) => {
    let listaProdutos = (req, resp) => {
        let connection = require('./../infra/connectionFactory');
        var ProdutosDAO = new app.infra.ProdutosDAO(connection);
        ProdutosDAO.lista( (err, data) => {
            if (err) console.log(err); 
            console.log('livros')
            resp.render('home/home', { livros: data })
        });
    }

    app.get('/', listaProdutos);
}