const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello world, This is my Node.js server');
});

const port = 10000;

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});
