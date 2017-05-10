//const isomorphicConfig = require("isomorphic-config");
//const clientConfig = isomorphicConfig.client;
//const serverConfig = isomorphicConfig.server;
const clientConfig = {"greeting": "Alooo!"};
const serverConfig = {"port": 3000};

const express = require('express');
const server = express();
const hello = require("./Hello.js");

server.get('/', function (req, res) {
    res.send(
        `<!DOCTYPE html>
        <html lang="en">
           <head>
                <title>Hello Isomorphic Config</title>
                <script charSet="UTF-8">var CONFIG=${JSON.stringify(clientConfig)}</script>
           </head>
           <body>
               ${hello}
           </body>
        </html>`
    );
});
server.listen(serverConfig.port, function () {
    console.log(`Example app listening on port ${serverConfig.port}!`);
});