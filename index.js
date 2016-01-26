var path    = require('path');
var debug   = require('debug');
var config  = require('config');
// koa
var koa       = require('koa');
var routeify  = require('koa-routeify');

var Persian = function(options){
  if(!(this instanceof Persian)){
    return new Persian(options);
  }
  this.options = options || config;
  this.app = koa();
};

Persian.prototype.load = function(extension) {
  let middleware;
  if(typeof extension === 'string') {
    debug('')("Load Extension: " + extension);
    try {
      extension = require(path.join(this.options.path.extensions, extension));
    } catch (err) {
      if (err.code !== 'MODULE_NOT_FOUND') {
        throw err;
      }
      extension = require(path.join(extension));
    }
  }

  if (extension.constructor.name === 'GeneratorFunction') {
    middleware = extension;
  } else {
    middleware = extension(this.app, this.options);
  }

  if(middleware) {
    this.app.use(middleware);
  }

  return this;
};

Persian.prototype.start = function(callback) {
  this.app.use(routeify(this.app));
  this.app.listen(this.options.port, callback);
  return this;
};

Persian.Controller = function() {
  return this;
};

Persian.Controller.prototype.send = function(body) {
  this.ctx.body = body;
};

module.exports = Persian;
