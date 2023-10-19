const Category = require("../models/categoryModel");
const middlewares = require('../middlewares/middlewares');

const isAdmin = middlewares.isAdmin;

module.exports = {
    async postCategoryCreate(req, res) {
        const categoryName = req.body.categoryName;
        const dbCategoryName = await Category.findOne({ categoryName });
        if(!dbCategoryName){
            new Category({
                categoryName: categoryName
            }).save().then(() => {
                console.log('Categoria cadastrada com sucesso');
                res.status(200).send('Categoria cadastrada com sucesso');
            }).catch((err) => {
                console.log('Erro ao cadastrar categoria: ' + err);
                res.status(400).send('Erro ao cadastrar categoria: ' + err);
            });
        }
    },
    async getCategoryCreate(req, res, isAdmin) {
        res.render('admin/categoryCreate', {layout: 'adminMenu'});
    }
}