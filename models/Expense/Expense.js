const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description:{
        type: String,
        required: [true, 'Please provide description'],
        maxlength: 100,
    },
    amount:{
        type: Number,
        required: [true, 'Please provide amount'],
        min: 1,
    },
    catergory:{
        type: String,
        required: [true, 'Please provide catergory'],
    },  
    createdAt:{
        type: Date,
        default: Date.now,
    },
    updatedAt:{
        type: Date,
        default: Date.now,
    },
});

const Expense = mongoose.model('Expense', ExpenseSchema);
module.exports = Expense;
