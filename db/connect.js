const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = (url)=>{
    return mongoose.connect(url , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } )
}

module.exports = connectDB;