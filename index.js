var path    = require('path');
var debug   = require('debug');
var config  = require('config');
// koa
var koa       = require('koa');

var Meow = function(options){
  if(!(this instanceof Meow)){
    return new Meow(options);
  }
  this.options = options || config;
  this.app = koa();
};

Meow.prototype.load = function(extension) {
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

Meow.prototype.start = function(callback) {
  this.app.listen(this.options.port, callback);
  return this;
};

Meow.Controller = function() {
  return this;
};

Meow.Controller.prototype.send = function(body) {
  this.ctx.body = body;
};

module.exports = Meow;
