const express = require('express');
const route = express.Router();
const middleware = require('../middlewares/middlewares');
const loginController = require('../controllers/loginController');
const signUpController = require('../controllers/signUpController');
const categoryController = require('../controllers/categoryController');
const ticketController = require('../controllers/ticketController');
const userController = require('../controllers/userController');


route.get("/", loginController.getLogin);
route.post("/api/login", loginController.postLogin);
route.get("/cadastro", signUpController.getCadastro);
route.post("/api/cadastro", signUpController.postCadastro);  
route.get("/home", loginController.getHome);
route.get("/logout", loginController.getLogout);
route.post("/api/categoryCreate", middleware.isAdmin, categoryController.postCategoryCreate);
route.get("/categoryCreate", middleware.isAdmin, categoryController.getCategoryCreate);
route.post("/api/ticketCreate", middleware.isUser, ticketController.postTicketCreate);
route.get("/ticketCreate", middleware.isUser, ticketController.getTicketCreate);
route.post("/api/techAssign", middleware.isAdmin, userController.postTechAssign);
route.get("/techAssign", middleware.isAdmin, userController.getTechAssign);
route.post("/api/ticketAssign", middleware.isAdmin, ticketController.postTicketAssign);
route.get("/ticketAssign", middleware.isAdmin, ticketController.getTicketAssign);
route.post("/api/resolveTicket", middleware.isTech, ticketController.postResolveTicket);
route.get("/resolveTicket", middleware.isTech, ticketController.getResolveTicket);

module.exports = route;