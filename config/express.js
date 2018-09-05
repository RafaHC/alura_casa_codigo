const express = require('express');
const load = require('express-load');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


module.exports = () => {
    let app = express();
    app.use(express.static('./app/public'))
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
   
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(expressValidator());
    load('routes', {cwd: 'app'})
        .then('infra')
        .into(app)

        app.use((req, res, next) => {
            res.status(404).render('erros/404');
            next();
        })
        //Como este midleware tem 4 argumentos, e o primeiro é um error, ganha prioridade
        app.use((error,req, res, next) => {
            res.status(500).render('erros/500');
            next();
        })
    return app;
};