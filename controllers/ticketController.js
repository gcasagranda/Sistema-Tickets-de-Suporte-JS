const Ticket = require('../models/ticketModel');
const Category = require('../models/categoryModel');
const User = require('../models/userModel');

module.exports = {
    async getTicketCreate (req, res){
        const categoryList = await Category.find();
        res.render('user/ticketCreate', 
            {layout: 'userMenu',
            categories: categoryList.map(category => category.toJSON())});
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
    },
    async getTicketAssign(req, res) {
        const ticketList = await Ticket.find({status: 'open'}).populate('category');
        const techList = await User.find({role: 'tech'});
        res.render('admin/ticketAssign', 
            {layout: 'adminMenu',
            tickets: ticketList.map(ticket => ticket.toJSON()),
            techs: techList.map(tech => tech.toJSON())});
    },
    async postTicketAssign(req, res) {
        const techId = req.body.techId;
        const ticketId = req.body.ticket;
        const ticket = await Ticket.updateOne({ _id: ticketId }, { status: 'assigned',techId: techId }, {upsert: true});
        if(ticket.modifiedCount != 1){
            console.log('Erro ao atribuir ticket');
            res.status(400).send('Erro ao atribuir ticket');
        } else {
            console.log('Ticket atribuído com sucesso');
            res.status(200).send('Ticket atribuído com sucesso');
        }
    }
}