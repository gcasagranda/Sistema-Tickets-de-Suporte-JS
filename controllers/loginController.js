const mongoose = require('mongoose');
const db_mongoose = require('../config/db_mongoose');
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
            } else {
            res.status(401).send('Senha incorreta');
            }
        }
    },
    async getCadastro(req, res){
        res.sendFile(path.join(__dirname, '.', '../views/cadastro.html'));
    },
    async postCadastro(req, res){
        new User({
            user: req.body.user,
            username: req.body.username,
            password: req.body.password
        }).save().then(() => {
            console.log('Usuário cadastrado com sucesso');
            res.status(200).send('Usuário cadastrado com sucesso');
        }).catch((err) => {
            console.log('Erro ao cadastrar usuário: usuário já existente ' + err);
            res.status(400).send('Erro ao cadastrar usuário: usuário já existente' + err);
        });
    }
}