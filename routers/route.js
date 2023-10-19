const express = require('express');
const route = express.Router();
const loginController = require('../controllers/loginController');
const signUpController = require('../controllers/signUpController');
const categoryController = require('../controllers/categoryController');
const ticketController = require('../controllers/ticketController');

route.get("/", loginController.getLogin);
route.post("/api/login", loginController.postLogin);
route.get("/cadastro", signUpController.getCadastro);
route.post("/api/cadastro", signUpController.postCadastro);  
route.get("/home", loginController.getHome);
route.get("/logout", loginController.getLogout);
route.post("/api/categoryCreate", categoryController.postCategoryCreate);
route.get("/categoryCreate", categoryController.getCategoryCreate);
route.post("/api/ticketCreate", ticketController.postTicketCreate);
route.get("/ticketCreate", ticketController.getTicketCreate);

module.exports = route;