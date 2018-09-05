module.exports = function(app){
    let listaProdutos = (req, resp) => {
        let connection = require('./../infra/connectionFactory');
        var ProdutosDAO = new app.infra.ProdutosDAO(connection);
        ProdutosDAO.lista( (err, data) => {
            if (err) console.log(err); 
            //Content negotiation
            resp.format({
                html: () => resp.render('promocoes/promocoes', { lista: data }), 
                json: () => resp.json(data)
            })
            
        });
    }

    app.get('/promocoes/form', listaProdutos);

    app.post('/promocoes', (req, resp) => {
        let promocao = req.body;
        console.log(promocao)
        app.get('io').emit('novaPromocao',promocao);
        resp.redirect('promocoes/form');
        
    })

}