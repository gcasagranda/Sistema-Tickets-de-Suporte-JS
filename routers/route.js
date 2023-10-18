const express = require('express');
const route = express.Router();
const loginController = require('../controllers/loginController');
const signUpController = require('../controllers/signUpController');

route.get("/", loginController.getLogin);
route.post("/api/login", loginController.postLogin);
route.get("/cadastro", signUpController.getCadastro);
route.post("/api/cadastro", signUpController.postCadastro);  
route.get("/home", loginController.getHome);
route.get("/logout", loginController.getLogout);

module.exports = route;