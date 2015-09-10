var path    = require('path');
var debug   = require('debug');
var config  = require('config');
// koa
var koa       = require('koa');
var routeify  = require('koa-routeify');

/**
 * [function description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
var Kanary = function(options){
  if(!(this instanceof Kanary)){
    return new Kanary(options);
  }
  this.options = options || config;
  //
  this.app = koa();
  //
};
/**
 * [function description]
 * @param  {[type]} extension [description]
 * @return {[type]}           [description]
 */
Kanary.prototype.use = function(extension){
  if(typeof extension == 'string'){
    debug('kanary')("load extension " + extension);
    extension = require(path.join(this.options.path.extensions, extension));
  }
  if(typeof extension == 'function'){
    var middleware = extension(this.app, this.options);
    if(middleware) this.app.use(middleware);
  }
  return this;
};
/**
 * [function description]
 * @param  {[type]} port [description]
 * @return {[type]}      [description]
 */
Kanary.prototype.start = function(callback){
  this.app.use(routeify(this.app));
  this.app.listen(this.options.port, callback);
  return this;
};

/**
 * [function description]
 * @return {[type]} [description]
 */
Kanary.Controller = function(){
  return this;
};
/**
 * [function description]
 * @param  {[type]} body [description]
 * @return {[type]}      [description]
 */
Kanary.Controller.prototype.send = function(body){
  this.ctx.body = body;
};

/**
 * [function description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
module.exports = Kanary;
