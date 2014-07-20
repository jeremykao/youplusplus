//server.js
var Hapi = require('hapi');
var routes = require('./routes')
var config = {cors: true};
var server = Hapi.createServer('0.0.0.0', parseInt(process.env.PORT, 10) || 1234, config);

server.route(routes);

server.start();