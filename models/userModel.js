const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true 
    },
    status: {
        type: String,
        enum: ['active', 'deactive'],
        default: 'active'
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }

})

const User = mongoose.model('user', userSchema);

module.exports = User;