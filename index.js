const express = require('express');
const app = express();
const path = require('path');

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/html/login.html'));
});

app.get('/cadastro', function(req, res){
    res.sendFile(path.join(__dirname + '/html/cadastro.html'));
});

app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081");
});