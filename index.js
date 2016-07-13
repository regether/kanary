var path = require('path');
var debug = require('debug');
var config  = require('config');
var koa = require('koa');

var Salt = function(options){
  if(!(this instanceof Salt)){
    return new Salt(options);
  }
  this.options = options || config;
  this.app = koa();
};

Salt.Controller = function() {
  return this;
};

Salt.prototype.load = function(tool) {
  var middleware;
  if(typeof tool === 'string') {
    debug('')("Load Middlewares: " + tool);
    try {
      tool = require(path.join(this.options.path.middlewares, tool));
    } catch (err) {
      if (err.code !== 'MODULE_NOT_FOUND') {
        throw err;
      }
      tool = require(path.join(tool));
    }
  }

  if (tool.constructor.name === 'GeneratorFunction') {
    middleware = tool;
  } else {
    middleware = tool(this.app, this.options);
  }

  if(middleware) {
    this.app.use(middleware);
  }

  return this;
};

Salt.prototype.start = function(callback) {
  this.app.listen(this.options.port, callback);
  return this;
};

Salt.Controller.prototype.send = function(body) {
  this.ctx.body = body;
};

module.exports = Salt;
