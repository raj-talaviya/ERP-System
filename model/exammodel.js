var mongoose = require('mongoose');
var examschema = new mongoose.Schema({
    sid:{
        type:String,
        required:true,
    },
    subject:{
        english:{
            type:Number,
            required:true,
            maxLength:3
        },
        gujarati:{
            type:Number,
            required:true,
            maxLength:3
        },
        hindi:{
            type:Number,
            required:true,
            maxLength:3
        }
    },
    date:{
        type:Date,
        required:true,
    },
    total:{
        type:Number,
        required:true,
    },
    obtain:{
        type:Number
    },
    note:{
        type:String
    }
})

examschema.pre('save',function(){
    var eng = parseInt(this.subject.english);
    var guj = parseInt(this.subject.gujarati);
    var hindi = parseInt(this.subject.hindi);

    var obtain = eng+guj+hindi;
    this.obtain = obtain;
})

module.exports = mongoose.model('exam',examschema);