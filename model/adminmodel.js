var mongoose = require('mongoose');
var validator = require('validator');

var adminschema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        validate(val){
            if(validator.isEmail(val) == false){
                throw new error('Invalid email')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minLength:[2],
    }
})

module.exports = mongoose.model('admin',adminschema)