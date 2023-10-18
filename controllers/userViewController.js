const mongoose = require('mongoose');
const db_mongoose = require('../config/db_mongoose');
const path = require('path');

module.exports = {
    async getUserHome(req, res){
        res.render('usuario', {layout: 'userViewLayout'});
    }
}