const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Please provide name'],
    },
    image :{
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports =  mongoose.model('User', UserSchema);
