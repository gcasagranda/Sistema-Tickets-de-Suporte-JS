const mongoose = require('mongoose');

const categoryModel = mongoose.Schema({
    categoryName:{ type: String, required: true, unique: true }
});

module.exports = mongoose.model('Category', categoryModel);