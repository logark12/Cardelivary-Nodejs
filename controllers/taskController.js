const moment = require('moment')
// models
const Task = require('../models/task')
const Driver = require('../models/Driver')
const AssignDriver = require('../models/AssingDriver')

module.exports.task_get = async (req, res) =>{
    const date = new Date()
    // date.setHours( date.getHours() + 3 )
    try {
        const driver = await AssignDriver.find()
        .populate('Driver')
        
        const task = await Task.find()
        
        res.render('tasks/task', {task, driver, moment,date } )
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