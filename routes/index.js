var express = require('express');
var router = express.Router();
const admincontroller = require('../controller/admincontroller');
const usercontroller = require('../controller/staffcontroller');
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.filename)
    }
})
  
const upload = multer({ storage: storage })

//ADMIN
router.post('/admin',admincontroller.admin);
router.get('/admin',admincontroller.view_admin);
router.post('/admin/login',admincontroller.login);

//STAFF
router.post('/staff',upload.single('staff_img'),admincontroller.add_staff);
router.get('/staff',admincontroller.view_staff);
router.patch('/staff/:id',admincontroller.update_staff);
router.delete('/staff/:id',admincontroller.delete_staff);
router.post('/staff/login',usercontroller.login);
router.get('/staff/logout',usercontroller.logout)

//COURSE
router.post('/course',admincontroller.add_course);
router.get('/course',admincontroller.view_course);
router.patch('/course/:id',admincontroller.update_course);
router.delete('/course/:id',admincontroller.delete_course);

//STUDENT
router.post('/student',usercontroller.add_student);
router.get('/student/:id',usercontroller.view_student);

//EXAM
router.post('/exam/:id',usercontroller.add_marks);
router.get('/exam',usercontroller.view_marks);

//LEAVE
router.post('/leave',usercontroller.add_leave);
router.get('/leave',usercontroller.view_leave);

module.exports = router;