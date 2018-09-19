/*
 * Node js master class homework 1
 * simple REST API
 * The server listens on port 3000
 * Responds with a message to POST req on the /hello endpoint.
 */

 const http = require('http');
 const url = require('url');

 const httpServer = http.createServer(function (req, res ){

  const parsedUrl = url.parse(req.url,true);

  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g,'');

  const method = req.method.toLowerCase();

  const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

  chosenHandler(method, function(statusCode, payload){
       statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
       payload = typeof(payload) == 'object' ? payload : {};

       res.setHeader('Content-Type', 'application/json');
       res.writeHead(statusCode);
       res.end(JSON.stringify(payload));
       });
  });

 httpServer.listen(3000, function(){
   console.log('Server listening on port 3000');
 });

 const handlers = {};

 handlers.hello = function(method, callback ){
   if (method == 'post'){
     callback(200, {'message' : 'hello from node js server'});
   }else{
     callback(404); // API listens for post requests only
   }
 };

 handlers.notFound = function(method, callback){
   callback(404);
 };

 const router = {
   'hello' : handlers.hello
 }
