const mongoose = require('mongoose');

var courseschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    fees:{
        type:Number,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    }
});

module.exports = mongoose.model('course',courseschema)