const express = require('express');
const route = express.Router();
const loginController = require('../controllers/loginController');

route.get("/", loginController.getLogin);
route.post("/api/login", loginController.postLogin);
route.get("/cadastro", loginController.getCadastro);
route.post("/api/cadastro", loginController.postCadastro);  


module.exports = route;