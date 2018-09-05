const http = require('http');

let config = {
    hostname: 'localhost',
    port: 3000,
    path: '/produtos',
    headers: {
        'Accept': 'application/json'
    }
}

http.get(config, (res) => {
    console.log(res.statusCode);
    
    res.on('data', (body) => console.log('Corpo' + body))
})