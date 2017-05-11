const isomorphicConfig = require("isomorphic-config");

const express = require('express');
const server = express();
const hello = require("./Hello.js");

// You would be wise to only expose to the client non-sensitive configuration.
// It's a good idea to keep all client configurations in a "client" key and only expose that:
const clientConfig = {client: isomorphicConfig.client};
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
               <script>alert(CONFIG.client.greeting);</script>
           </body>
        </html>`
    );
});
server.listen(isomorphicConfig.server.port, function () {
    console.log(`Example app listening on port ${isomorphicConfig.server.port}!`);
});