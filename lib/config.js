
var getConfig = function() {

    var config = {};
    var overridenConfig;

    // if we are in a node.js environment we shall have access to fs and path modules.
    // So we go ahead and use them to read a configuration file
    try {
        const fs = require("fs");
        const path = require("path");
        CONFIG_DIR = process.env.CONFIG_DIR || path.join(process.cwd(), "config");

        const overrideConfigWithEnv = function (config, envs) {
            if (!envs) {
                const content = fs.readFileSync(path.resolve(CONFIG_DIR, "./custom-environmental-variables.json"), "utf8");
                envs = JSON.parse(content);
            }
            for (var property in config) {
                if (config.hasOwnProperty(property)) {
                    if (typeof config[property] === "object" && !(config[property] instanceof Array)) {
                        config[property] = overrideConfigWithEnv(config[property], envs[property]);
                    } else {
                        if (typeof envs[property] !== "undefined") {
                            if (!!process.env[envs[property]]) {
                                config[property] = process.env[envs[property]];
                            }
                        }
                    }
                }
            }
            return config;
        };

        const content = fs.readFileSync(path.resolve(CONFIG_DIR, "./default.json"), "utf8");
        if (content) {
            const defaultConfig = JSON.parse(content);
            overridenConfig = overrideConfigWithEnv(defaultConfig);
        } else {
            console.log("No configuration file found.")
        }

    } catch (err) {
    }


    // if configuration could be retrieved from a server file
    if (typeof overridenConfig !== "undefined") {
        config = overridenConfig;
    }
    // else we try to look for it in a client's global variable "CONFIG"
    else {
        if (typeof CONFIG !== 'undefined') {
            config = CONFIG;
        }
    }

    return config
};

module.exports = getConfig();