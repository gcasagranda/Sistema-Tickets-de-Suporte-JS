const Ticket = require('../models/ticketModel');
const Category = require('../models/categoryModel');
const middlewares = require('../middlewares/middlewares');

const isAdmin = middlewares.isAdmin;
const isUser = middlewares.isUser;
const isTech = middlewares.isTech;

module.exports = {
    async getTicketCreate (req, res, isUser){
        const categoryList = await Category.find();
        res.render('user/ticketCreate', {layout: 'userMenu', categories: categoryList.map(category => category.toJSON())});
    },
    async postTicketCreate(req, res) {
        new Ticket ({
            title: req.body.ticketTitle,
            description: req.body.ticketDescription,
            category: req.body.ticketCategory,
            userId: req.session.idUser
        }).save().then(() => {
            console.log('Ticket cadastrado com sucesso');
            res.status(200).send('Ticket cadastrado com sucesso');
        }).catch((err) => {
            console.log('Erro ao cadastrar ticket: ' + err);
            res.status(400).send('Erro ao cadastrar ticket: ' + err);
        });
    }
}