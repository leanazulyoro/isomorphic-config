# Isomorphic Config
A configuration manager for isomorphic applications

## installation
```
npm install --save isomorphic-config
```

## Usage
### From server

Just import and use it, isomorphic-config will make use of server side capabilities to read a configuration file and retrieve the configurations in it.
```
const isomorphicConfig = require("isomorphic-config");
const config = isomorphicConfig.server;
const express =  require("express");

let server = express();
server.listen(config.port, (err) => {
    if (err) {
        throw new Error(err);
    } else {
        console.info('Listening at http://localhost: ', config.port);
    }
});

```

### From client
In order to use the config in a client app, you would need to expose it in a global variable ("CONFIG") from the server initial render.
Isomorphic-config will detect it and retrieve it (see the "Hello" example)

```
// server initial render (server.js)
const isomorphicConfig = require("isomorphic-config");
const clientConfig = isomorphicConfig.client;
const serverConfig = isomorphicConfig.server;

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

// Hello component (Hello.js):
const isomorphicConfig = require("isomorphic-config");
const config = isomorphicConfig.client;
const hello = `<div class="greeting">${config.greeting}</div>`
module.exports = hello;

```