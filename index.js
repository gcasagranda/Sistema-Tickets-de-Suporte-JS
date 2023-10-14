const express = require('express');
const app = express();
const path = require('path');
const url = require('url');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/html/login.html'));
});

app.post('/confirma', function(req, res){
    res.send('Login efetuado com sucesso: ' + req.body.user);
});

app.get('/confirma', function(req, res){
    q = url.parse(req.url, true);
    res.send('Login efetuado com sucesso: ' + q.query.user);
});

app.get('/cadastro', function(req, res){
    res.sendFile(path.join(__dirname + '/html/cadastro.html'));
});

app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081");
});