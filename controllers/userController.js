const User = require('../models/userModel');

module.exports = {
    async postTechAssign(req, res, isAdmin){
        const techId = req.body.techId;
        const tech = await User.updateOne({ _id: techId }, { role: 'tech' });
        if (tech.modifiedCount != 1){
            console.log('Erro ao atribuir técnico');
            res.status(400).send('Erro ao atribuir técnico');
        } else {
            console.log('Técnico atribuído com sucesso');
            res.status(200).send('Técnico atribuído com sucesso');
        }
    },
    async getTechAssign(req, res){
        const userList = await User.find({ role: 'user' });
        res.render('admin/techAssign', {layout: 'adminMenu', users: userList.map(user => user.toJSON())});
    }
}