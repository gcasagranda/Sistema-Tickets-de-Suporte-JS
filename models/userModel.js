const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userModel = mongoose.Schema({
    username:{ type: String, required: true },
    user:{ type: String, required: true, unique: true },
    password:{ type: String, required: true },
    role:{ type: String, required: true, default: 'user', enum: ['user', 'admin', 'technician'] }
});

userModel.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        return next();
      } catch (err) {
        return next(err);
      }
});

module.exports = mongoose.model('User', userModel);