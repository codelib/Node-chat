//modulos js
var express= require('express');
var cons = require('consolidate');
var http= require('http');
var app = express();
var servidor= http.createServer(app);


var tweets = [];

//Configuracion de render
	
	app.use(express.static('./public'));
	app.engine('html', cons.jqtpl);
	app.set('view engine' , 'html');
	app.set('views', './views');

app.get('/', function (req,res){
	 res.render('index',{nombre:'Noditter'}); 
});
servidor.listen(8000);