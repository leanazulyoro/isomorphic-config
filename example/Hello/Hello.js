//const isomorphicConfig = require("isomorphic-config");
//const config = isomorphicConfig.client;
const config = {"greeting": "Alooo!"};
const hello = `<div class="greeting">${config.greeting}</div>`
module.exports = hello;