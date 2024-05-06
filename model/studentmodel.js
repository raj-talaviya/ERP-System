var mongoose = require('mongoose');

var studentschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    contact_no:{
        type:Number,
        required:true,
        unique:true,
        maxLength:10,
        minLength:10,
    },
    address:{
        type:String,
    },
    course:{
        type:String,
        required:true,
        lowercase:true,
    },
    course_content:{
        type:String
    },
    time:{
        type:String,
    },
    qualification:{
        type:String,
        lowercase:true,
    },
    fees:{
        type:Number,
        required:true,
    },
    fees_detail:{
        date:{
            type:Date,
            required:true,
        },
        amount:{
            type:Number,
            required:true,
        },  
        fees_status:{
            type:String,
            required:true,
            default:"pending"
        }
    },
    staff_id:{
        type:String
    }
})

module.exports = mongoose.model('student',studentschema);