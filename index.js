const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db_mongoose = require('./config/db_mongoose');
const routes = require('./routers/route');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

mongoose.connect(db_mongoose.connection, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log('Conectado');
}).catch(() => {
    console.log('Erro de conexão com o banco de dados');
});


app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081");
});