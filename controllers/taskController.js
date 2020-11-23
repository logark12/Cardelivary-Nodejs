const moment = require('moment')
// models
const Task = require('../models/task')
const Driver = require('../models/Driver')
const AssignDriver = require('../models/AssingDriver')

const Driv = async () => {
    try{
        const driver = await AssignDriver.find()
        .populate('Driver')
    
        // console.log(driver)
    }catch (err){
        console.log(err)
    }
    
}

Driv()


const checkTaskIsDone = async () => {
    const tasks = await Task.find({})
        
        for(i= 0; i < tasks.length; i++){
            
            const date = new Date()
            // console.log(task[i].endDate)
            if (tasks[i].endDate < date){
                tasks[i].status = 'complete'
                // console.log('comp',  tasks[i].endDate, date)
                tasks[i].save()
                
            }else if(tasks[i].endDate > date){
                tasks[i].status = 'pending'
                // console.log('pendig', tasks[i].endDate)
                tasks[i].save()
            }
        }
}



module.exports.task_get = async (req, res) =>{

    try {
        checkTaskIsDone()
        const driver = await AssignDriver.find()
        .populate('Driver')
        
        const task = await Task.find()
        
        res.render('tasks/task', {task, driver, moment} )
    } catch (err) {
        console.log(err)
    }
    
}

module.exports.task_post = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.redirect('/tasks')
    } catch (err) {
        console.log(err)
    }
}

module.exports.task_update_get = async (req, res) => {
    const id = req.params.id
    
    try {
        
        const driver = await Driver.find()
        const task = await Task.findById(id)
        res.render('tasks/edit', {task , driver})
    } catch (err) {
        console.log(err)
    } 
};

module.exports.task_update_post = async (req, res) => {

    try{
        const tasks = await Task.findByIdAndUpdate(req.params.id,req.body);
        // res.status(201).json({movie :movie._id })
        res.redirect('/tasks')
    }catch(err){
        console.log(err)
    }


}

module.exports.task_delete = (req, res) => {
    const id = req.params.id

    Task.findByIdAndDelete(id)
    .then(result => {
        res.redirect('/tasks')
    })
    .catch(err => {
        console.log(err)
    })
}