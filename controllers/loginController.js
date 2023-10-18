const path = require('path');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports = {
    async getLogin(req, res){
       res.sendFile(path.join(__dirname, '.', '../views/login.html'));
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
                res.status(200).send('Login bem-sucedido');
                req.session.user = user;
                res.locals.user = user;
                res.locals.idUser = dbUser._id;
                res.locals.role = dbUser.role;
            } else {
            res.status(401).send('Senha incorreta');
            }
        }
    },
    async getHome(req, res){
        if (req.session.user) {
            if (res.locals.role == 'admin') {
                res.sendFile(path.join(__dirname, '.', '../views/admin.html'));
            } else if (res.locals.role == 'user') {
                res.sendFile(path.join(__dirname, '.', '../views/user.html'));
            } else if (res.locals.role == 'tech'){
                res.sendFile(path.join(__dirname, '.', '../views/tech.html'));
            } else {
                alert('Erro ao identificar o tipo de usuário');
                res.status(400).send("Erro ao identificar o tipo de usuário");
            }
        } else {
            alert('Usuário não autenticado');
            res.status(400).send('Usuário não autenticado');
            res.redirect('/');
        }
    }
}