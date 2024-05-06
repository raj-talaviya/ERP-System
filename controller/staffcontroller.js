var staffmodel = require('../model/staffmodel');
var studentmodel = require('../model/studentmodel');
var exammodel = require('../model/exammodel');
var leavemodel = require('../model/leavemodel');
const storage = require('node-persist');
const bcrypt = require('bcrypt');
storage.init( /* options ... */ );

//LOGIN
exports.login = async(req,res) =>{
    try {
        var login_status = await storage.getItem('staff_id');

        if(login_status == undefined){
            var data = await staffmodel.find({"email":req.body.email});
            if(data.length == 1){
                bcrypt.compare(req.body.password, data[0].password, function(err,result){
                    if(result == true){
                        storage.setItem('staff_id',data[0].id)
                        res.status(200).json({
                            status:"Login success"
                        })
                    }
                    else{
                        res.status(200).json({
                            status:"Check email and password"
                        })
                    }
                })
            }
            else{
                res.status(200).json({
                    status:"Check email and password"
                })
            }
        }
        else{
            res.status(200).json({
                status:"User is already login"
            })
        }
    } catch (error) {
        res.status(200).json({
            status:"Fail",
            message:error.message
        })
    }
}

//LOGOUT
exports.logout = async (req,res) =>{
    try {
        storage.clear();
        res.status(200).json({
            status:"Logout"
        })
    } catch (error) {
        res.status(200).json({
            status:"Fail",
            message:error.message
        })
    }
}

//ADD STUDENT
exports.add_student = async (req,res) =>{
    try {
        var staff_id = await storage.getItem('staff_id');
        if(staff_id != undefined){
            req.body.staff_id = staff_id;
            var data = await studentmodel.create(req.body);
            res.status(200).json({
                status:"student added",
                data
            })
        }
        else{
            res.status(200).json({
                status:"staff is not login"
            })
        }
    } catch (error) {
        res.status(200).json({
            status:"Fail",
            message:error.message
        })
    }
}

//DISPLAY STUDENT STAFF WISE
exports.view_student = async (req,res) =>{
    try {
            var staff_id = req.params.id;
            var data = await studentmodel.find({"staff_id": staff_id});
            if(data.length > 0){
                res.status(200).json({
                    data
                })
            }
            else{
                res.status(200).json({
                    status:"Staff has no student"
                })
            }
    } catch (error) {
        res.status(200).json({
            status:"Fail",
            message:error.message
        })
    }
}

//ADD MARKS
exports.add_marks = async(req,res) => {
    var student_id = req.params.id;
    req.body.sid = student_id;

    var note = req.body.subject;
    if(note.english < 33 || note.gujarati < 33 || note.hindi < 33){
        req.body.note = "Fail"
    }
    else{
        req.body.note = "Pass"
    }
    
    var data = await exammodel.create(req.body);
    res.status(200).json({
        data
    })
}

//VIEW MARKS
exports.view_marks = async(req,res) => {
    var data = await exammodel.find();
    res.status(200).json({
        data
    })
}

//ADD LEAVE
exports.add_leave = async(req,res) => {
    try {
        var login_status = await storage.getItem('staff_id');
        if(login_status != undefined){
            req.body.staff_id = login_status;
            var data = await leavemodel.create(req.body);
            res.status(200).json({
                status:"Inserted",
                data
            })
        }
        else{
            res.status(200).json({
                status:"Staff is not login"
            })
        }
    } catch (error) {
        res.status(200).json({
            status:"Fail",
            message:error.message
        })
    }
}   

//VIEW LEAVE
exports.view_leave = async(req, res) => {
        try {
            var data = await leavemodel.find().populate("staff_id");
            res.status(200).json({
                data
            })
        } catch (error) {
            res.status(200).json({
                status:"Fail",
                message:error.message
            })   
        }
}