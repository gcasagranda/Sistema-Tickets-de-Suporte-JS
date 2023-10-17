const mongoose = require('mongoose');

const ticketModel = mongoose.Schema({
    title:{ type: String, required: true },
    description:{ type: String, required: true },
    category:{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    status:{ type: String, required: true, default: 'open', enum: ['open', 'assigned', 'closed'] },
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    technician:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt:{ type: Date, default: Date.now },
    endedAt:{ type: Date }
});

ticketModel.pre('save', async function(next){
    const ticket = this;
    if(!ticket.isModified('technician')) return next();
    if(ticket.technician != null){
        ticket.status = 'assigned';
    }
    return next();
});

ticketModel.pre('save', async function(next){
    const ticket = this;
    if(!ticket.isModified('status')) return next();
    if(ticket.status == 'closed'){
        ticket.endedAt = Date.now();
    }
    return next();
});

module.exports = mongoose.model('Ticket', ticketModel);