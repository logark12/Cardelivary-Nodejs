const router = require('express').Router();
const taskController = require('../controllers/taskController')

router.get('/', taskController.task_get)
router.post('/', taskController.task_post)

router.get('/update/:id', taskController.task_update_get)
router.post('/update/:id', taskController.task_update_post)

router.get('/delete/:id', taskController.task_delete)

module.exports = router


// Student.findOne({_id:req.params.id}, function(err, student){
//     if(!err && student){
//         Courses.find({student_id:req.params.id},function(error,courses){
//              if(!error && courses){
//                  student.courses=courses;
//              }else{
//                  student.courses=[];
//              }
//              res.send(student);
//         });
//     }
// });