
const getConfig = function() {
  var config = getConfigFromClient();
  if(!config) {
    try {
      config = getConfigFromServerOrThrow();
    } catch (err) {
      throw err;
    }
  }
  return config
};

const overrideConfigWithEnv = function (config, envs) {
  if (!envs) {
    const content = fs.readFileSync(path.resolve(CONFIG_DIR, "./custom-environment-variables.json"), "utf8");
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
};

/**
 * if we are in a node.js environment we shall have access to fs and path modules.
 * So we go ahead and use them to read a configuration file
 */
var getConfigFromServerOrThrow = function () {
  try {
    const fs = require("fs");
    const path = require("path");
    var CONFIG_DIR;
    var overridenConfig;
    CONFIG_DIR = process.env.CONFIG_DIR || path.join(process.cwd(), "config");
    const content = fs.readFileSync(path.resolve(CONFIG_DIR, "./default.json"), "utf8");
    if (content) {
      const defaultConfig = JSON.parse(content);
      overridenConfig = overrideConfigWithEnv(defaultConfig);
    } else {
      console.log("No configuration file found.")
    }
    return overridenConfig;
  } catch(err) {
    throw err;
  }
};

/**
 * try to look for a client's global variable named "CONFIG"
 */
var getConfigFromClient = function () {
  return (window.hasOwnProperty("CONFIG")) ? window.CONFIG : null ;
};

module.exports = getConfig();