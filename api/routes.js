//routes.js
var Types = require('hapi').Types;
var mongoose = require('mongoose');

/*** Models ***/
var Users = require('./models/Users')

/*** Open DB Connection ***/
mongoose.connect('mongodb://localhost/youplusplus');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('opened database connection');
});

/*** Routes ***/
module.exports = [
	{
    path: '/',
	  method: 'GET', 
	  handler: test
	}
];


function test(request, reply){
  reply('yolo swag to the max');
}