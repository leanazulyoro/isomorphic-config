const isomorphicConfig = require("isomorphic-config");
const config = isomorphicConfig.client;
const hello = `<div class="greeting">${config.greeting}</div>`
module.exports = hello;