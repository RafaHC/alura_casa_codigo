const express = require('../config/express')();
const request = require('supertest')(express);
//node database cleanner
describe('#ProdutosController', () => {
    
    it('#listagem json', (done) => {
            request.get('/produtos')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        })
    it('#listagem html', (done) => {
            request.get('/produtos')
                .set('Accept', 'text/html')
                .expect('Content-Type', /html/)
                .expect(200, done);
        })
    it('#cadastro de novo produto com dados invalidos', function (done) {
            request.post('/produtos')
                .send({ titulo: '', descricao: 'novo livro' })
                .expect(400, done);
        })
    it('#cadastro de novo produto com dados validos', function (done) {
            request.post('/produtos')
                .send({ titulo: 'New Livro 32', descricao: 'novo livro 31', preco: 100 })
                .expect(302, done);
        })
})