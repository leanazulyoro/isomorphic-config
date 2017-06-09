# Isomorphic Config
A configuration manager for isomorphic applications

## installation
```
npm install --save isomorphic-config
```

## Usage
First of all, you need to create a "config" directory in the root of your project and add a "default.json" file in it with the settings required by your app.

### From server
Just import and use it, isomorphic-config will make use of server side capabilities to read the configuration file ("/config/default.json") and retrieve the configurations in it.
```javascript
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
In order to use the config in a client app, you would need to expose it in a global variable ("CONFIG") from the server initial render, for later use in the app (see the "Hello" example).
##### server initial render (server.js)
```javascript
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

```
##### Hello component (Hello.js)
```javascript
const isomorphicConfig = require("isomorphic-config");
const config = isomorphicConfig.client;
const hello = `<div class="greeting">${config.greeting}</div>`
module.exports = hello;

```

## Environment Variables
Inspired by the [config](https://www.npmjs.com/package/config) module, you can define environment variables to override specific configurations. If you're running on a server, isomorphic-config will check for the existance of a given environment variable and replace the config associated to it with it's value.

To enable custom environment variables, create a configuration file, custom-environment-variables.json (and place it in the "config") directory mapping the environment variable names into your configuration structure. For example:
```json
{
  "server": {
    "port": "PORT"
  },
  "client": {
    "greeting": "GREETING"
  }
}
```
...would cause isomorphic-config to check for the environment variables PORT and GREETING. If they exist, they would override the values for server.port, and client.greeting in your configuration.

## Why use it?
to centralize the way configurations are requested throughout your isomorphic application. The [config](https://www.npmjs.com/package/config) works only on server side because it uses file system to read a config file. Isomorphic Config does the same but also attemps to read the configuration from a client Global variable.
Also, unlike [config](https://www.npmjs.com/package/config), it only supports json format, so code is more straight-foward and has less dependencies.


