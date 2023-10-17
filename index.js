const express = require('express');
const app = express();
const path = require('path');
const url = require('url');
const mongoose = require('mongoose');
const db_mongoose = require('./config/db_mongoose');
const userModel = require('./models/userModel');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(db_mongoose.connection, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log('Conectado');
}).catch(() => {
    console.log('Erro de conexão com o banco de dados');
});

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/html/login.html'));
});

app.post('/confirmaLogin', function(req, res){
    res.send('Login efetuado com sucesso: ' + req.body.user);
});

app.get('/confirma', function(req, res){
    q = url.parse(req.url, true);
    res.send('Login efetuado com sucesso: ' + q.query.user);
});

app.get('/cadastro', function(req, res){
    res.sendFile(path.join(__dirname + '/html/cadastro.html'));
});

app.post('/api/cadastro', function(req, res){
    new userModel({
        user: req.body.user,
        username: req.body.username,
        password: req.body.password
    }).save().then(() => {
        console.log('Usuário cadastrado com sucesso');
        res.status(200).send('Usuário cadastrado com sucesso');
    }).catch((err) => {
        console.log('Erro ao cadastrar usuário: ' + err);
        res.status(400).send('Erro ao cadastrar usuário: ' + err);
    });
});

app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081");
});