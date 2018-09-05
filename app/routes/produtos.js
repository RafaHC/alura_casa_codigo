
module.exports =  (app) => {
    let listaProdutos = (req, resp) => {
        let connection = require('./../infra/connectionFactory');
        var ProdutosDAO = new app.infra.ProdutosDAO(connection);
        ProdutosDAO.lista( (err, data) => {
            if (err) console.log(err); 
            //Content negotiation
            resp.format({
                html: () => resp.render('produtos/lista', { lista: data }), 
                json: () => resp.json(data)
            })
            
        });
    }

    app.get('/produtos', listaProdutos);

    app.get('/produtos/form', (req, resp) => {
        resp.render('produtos/form', {errosValidacao: {}, produto: {}});
    });

    app.post('/produtos', (req, resp) => {
        let produto = req.body;

        //Add o express-validator no projeto, o request recebe funções extras
        req.assert('titulo', 'Titulo é obrigatório!').notEmpty();
        req.assert('preco', 'Formato invalido').isFloat();

        let erros = req.validationErrors();

        if(erros){
            resp.format({
                html: () => resp.status(400).render('produtos/form', {errosValidacao: erros, produto: produto}),
                json: () => resp.status(400).json(erros)    
            })
            
            return;
        }

        let connection = require('./../infra/connectionFactory');
        let ProdutosDAO = new app.infra.ProdutosDAO(connection);
        ProdutosDAO.salva(produto, (err, data) => {
            if (err) console.log(err); 
            if(!erros) resp.redirect('/produtos');
        });

    })
}

