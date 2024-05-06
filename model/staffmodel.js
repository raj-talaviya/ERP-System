var mongoose = require('mongoose');
const validator = require('validator');

var staffschema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercse:true,
        validate(email){
            if(validator.isEmail(email) == false){
                throw new Error('Invalid email ')
            }
        }
    },
    password:{
        type:String,
        required:true,
    },
    staff_img:{
        type:String
    }
});

module.exports = mongoose.model('staff',staffschema);