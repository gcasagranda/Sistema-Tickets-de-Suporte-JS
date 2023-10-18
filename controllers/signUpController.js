const path = require('path');
const User = require('../models/userModel');

module.exports = {
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