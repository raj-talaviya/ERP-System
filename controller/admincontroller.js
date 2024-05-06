const adminmodel = require('../model/adminmodel');
const staffmodel = require('../model/staffmodel');
const coursemodel = require('../model/coursemodel');
const bcrypt = require('bcrypt');

//ADMIN
exports.admin = async(req,res) =>{
    try {
        var b_pass = await bcrypt.hash(req.body.password,10);
        req.body.password = b_pass;

        var data = await adminmodel.create(req.body);
        res.status(200).json({
            status:"Added",
            data
        })
    } catch (error) {
        res.status(200).json({
            status:"Fail",
            message:error.message
        })
    }
}

//VIEW ADMIN
exports.view_admin = async(req,res) =>{
    try {
        var data = await adminmodel.find();
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

//LOGIN
exports.login = async(req,res) =>{
    try {
        var data = await adminmodel.find({"email":req.body.email});

        if(data.length == 1){
                bcrypt.compare(req.body.password,data[0].password,function(err,result){
                    if(result == true){
                        res.status(200).json({
                            status:"Login Success"
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
    } catch (error) {
        res.status(200).json({
            status:"Fail",
            message:error.message
        })
    }
}

// ==================================
//             STAFF
// ==================================

//ADD STAFF
exports.add_staff = async(req,res) =>{
    try {
        var b_pass = await bcrypt.hash(req.body.password,10);
        req.body.password = b_pass;
        var data = await staffmodel.create(req.body);
        res.status(200).json({
            status:"Staff added",
            data
        })
    } catch (error) {
        res.status(200).json({
            status:"Fail",
            message:error.message
        })
    }
}

//VIEW STAFF
exports.view_staff = async(req,res) =>{
    try {
        var data = await staffmodel.find();
        res.status(200).json({
            data
        })
    } catch (error) {
        res.status(200).json({
            status:"fail",
            message:error.message
        })
    }
}

//UPDATE STAFF
exports.update_staff = async(req,res) =>{
    try {
        var id = req.params.id;
        var data = await staffmodel.findByIdAndUpdate(id,req.body);
        res.status(200).json({
            status:"Updated",
            data
        })
    } catch (error) {
        res.status(200).json({
            status:"fail",
            message:error.message
        })
    }
}

//DELETE STAFF
exports.delete_staff = async(req,res) =>{
    try {
        var id = req.params.id;
        var data = await staffmodel.findByIdAndDelete(id);
        res.status(200).json({
            status:"Deleted"
        })
    } catch (error) {
        res.status(200).json({
            status:"fail",
            message:error.message
        })
    }
}

// ==================================
//             COURSE
// ==================================

//ADD COURSE
exports.add_course = async(req,res) =>{
    try {
        var data = await coursemodel.create(req.body);
        res.status(200).json({
            status:"Course Added",
            data
        })
    } catch (error) {
        res.status(200).json({
            status:"fail",
            message:error.message
        })
    }
}

//UPDATE COURSE
exports.update_course = async(req,res) =>{
    try {
        var id = req.params.id;
        var data = await coursemodel.findByIdAndUpdate(id,req.body);
        res.status(200).json({
            status:"Course Updated",
            data
        });
    } catch (error) {
        res.status(200).json({
            status:"fail",
            message:error.message
        })
    }
}

//DELETE COURSE
exports.delete_course = async(req,res) =>{
    try {
        var id = req.params.id;
        var data = await coursemodel.findByIdAndDelete(id);
        res.status(200).json({
            status:"Course Deleted",
        })
    } catch (error) {
        res.status(200).json({
            status:"fail",
            message:error.message
        })
    }
}

//VIEW COURSE
exports.view_course = async(req,res) =>{
    try {
        var data = await coursemodel.find();
        res.status(200).json({
            data
        })
    } catch (error) {
        res.status(200).json({
            status:"fail",
            message:error.message
        })
    }
}