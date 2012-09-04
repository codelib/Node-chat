//modulos node
var express= require('express');
var cons = require('consolidate');
var http= require('http');
var app = express();
var servidor= http.createServer(app);
servidor.listen(8000);
var tweets = [];
//configuracion template
	app.use(express.static('./public'));
	//jquery Templates
	app.engine('html', cons.jqtpl);
	//html como extension default
	app.set('view engine' , 'html');
    app.set('views', './views');

app.get('/', function (req,res){
	 res.render('index.html',{name:'Noditter'}); 
})
app.post('/send', express.bodyParser(), function ( req, res){
if(req.body && req.body.tweet){
	tweets.push(req.body.tweet);
	res.send({status: "ok" , message:"recieved"});
}else{
	res.send({
		status:"nok", message : "not_recieved"
	})
}
})
app.get('/tweets', function (req, res){
	res.send(tweets)
})
var io= require('socket.io').listen(servidor);
io.sockets.on('connection', function(socket){
	console.log('una nueva socket se ha conectado');
	socket.on('emitwit', function(){
		io.sockets.emit('twitting',tweets);
	});
})
console.log('localhost: 8000!')