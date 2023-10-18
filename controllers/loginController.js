const path = require('path');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports = {
    async getLogin(req, res){
        if (req.session.user == undefined) {
            res.sendFile(path.join(__dirname, '.', '../views/login.html'));
        } else {
            res.redirect('/home');
        }
    },
    async postLogin(req, res){
        const user = req.body.user;
        const password = req.body.password;
        const dbUser = await User.findOne({user});
        if(!dbUser){
            res.status(400).send('Usuário não encontrado');
        } else {
            const passwordMatch = await bcrypt.compare(password, dbUser.password);
            if (passwordMatch) {
                req.session.user = user;
                req.session.idUser = dbUser._id;
                req.session.role = dbUser.role;
                res.status(200).send('Login bem-sucedido');
            } else {
            res.status(401).send('Senha incorreta');
            }
        }
    },
    async getHome(req, res){
        if (req.session.user) {
            if (req.session.role === 'admin') {
                res.render('admin/home', {layout: 'adminMenu'});
            } else if (req.session.role === 'user') {
                res.render('user/home', {layout: 'userMenu'});
            } else if (req.session.role === 'tech'){
                res.render('tech/home', {layout: 'techMenu'})
            } else {
                res.status(400).send("Erro ao identificar o tipo de usuário");
            }
        } else {
            res.status(400).send('Usuário não autenticado');
            res.redirect('/');
        }
    },
    async getLogout(req,res){
        req.session.destroy();
        res.redirect('/');
    }
}