var mongoose = require('mongoose');
var leaveschema = new mongoose.Schema({
    leave_start_date:{
        type:Date,
        required:true
    },
    leave_end_date:{
        type:Date,
        required:true
    },
    reason:{
        type:String
    },
    leave_status:{
        type:String,
        enum:['absent','leave'],
        required:true
    },
    staff_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "staff"
    }
});

module.exports = mongoose.model('leave',leaveschema);