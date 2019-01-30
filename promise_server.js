var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var bodyParser = require('body-parser');



var nextIndex=5;

var suggestions = [];
suggestions[1] = {id: 1, description: "Honda Car", price: 100000};
suggestions[2] = {id: 2, description: "Toyota Car", price: 120000};
suggestions[3] = {id: 3, description: "Ford Car", price: 150000};
suggestions[4] = {id: 4, description: "Volkswagon Car", price: 200000};


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

setInterval(function() {
    http.get("http://justnobody.herokuapp.com");
}, 300000);

app.get('/', function(req, res){
  	res.sendFile(__dirname + '/promise.html');
});

app.get('/product_suggestion/:id', function(req, res){
	res.json(suggestions[req.params.id]);
});

app.post('/product_suggestion', function(req, res){
	new_suggestion  = req.body;
	new_suggestion.id = nextIndex;
	suggestions[nextIndex++] = new_suggestion;
	res.statusCode = 201;
	res.json(new_suggestion);
});

app.put('/product_suggestion', function(req, res){
	modified_suggestion  = req.body;
	suggestions[modified_suggestion.id] = modified_suggestion;
	res.statusCode = 200;
});

app.delete('/product_suggestion/:id', function(req, res){
	delete suggestions[req.params.id];
	res.sendStatus(200);
});

http.listen(8080, function(){
  	console.log('listening on *:8080');
});