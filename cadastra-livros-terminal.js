const http = require('http');

let config = {
    hostname: 'localhost',
    port: 3000,
    path: '/produtos',
    // Recebendo e enviando no formato json
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
    },
    method: 'post'
}

 let client = http.request(config, (res) => {
    console.log(res.statusCode);
    
    res.on('data', (body) => console.log('Corpo' + body))
});

let produto ={
    titulo: "Teste",
    descricao: "Um pouco sobre HTTP",
    preco: 100
}

client.end(JSON.stringify(produto));