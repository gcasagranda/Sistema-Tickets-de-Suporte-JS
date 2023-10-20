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
    },
    async getResolveTicket(req, res) {
        const ticketList = await Ticket.find({status: 'assigned', techId: req.session.idUser}).populate('category');
        res.render('tech/resolveTicket', 
            {layout: 'techMenu',
            tickets: ticketList.map(ticket => ticket.toJSON())});
    },
    async postResolveTicket (req, res) {
        const ticketId = req.body.ticketId;
        const newCommentary = req.body.commentary;
        commentaryObject = {content: newCommentary, createdAt: Date.now()};
        const closeTicket = req.body.closeTicket;
        if (closeTicket == 'true'){
            var ticket = await Ticket.updateOne({ _id: ticketId },
                { status: 'closed', $push: {commentary: commentaryObject}, endedAt: Date.now() }, {upsert: true});
        } else if (closeTicket == 'false'){
            var ticket = await Ticket.updateOne({ _id: ticketId }, { $push: {commentary: commentaryObject} }, {upsert: true});
        }
        if (ticket.modifiedCount != 1){
            console.log('Erro ao atualizar ticket');
            res.status(400).send('Erro ao atualizar ticket');
        } else {    
            console.log('Ticket atualizado com sucesso');
            res.status(200).send('Ticket atualizado com sucesso');
        }
    },
    async getTicketsList (req, res) {
        const ticketList = await Ticket.find({userId: req.session.idUser});
        res.render('user/ticketsList', 
            {layout: 'userMenu', tickets: ticketList.map(ticket => ticket.toJSON())});
    }
}