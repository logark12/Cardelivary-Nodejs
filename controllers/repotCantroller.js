const moment = require('moment')
// models
const Stores = require('../models/Store')
const Cars = require('../models/Cars')
const Drivers = require('../models/Driver')
const Tasks = require('../models/task')
const Assign = require('../models/AssingDriver')


module.exports.reports_store_get = async (req, res) => {
    
    const stores = await Stores.find()
    
    
    
    res.render('reports/reportsStore', {stores})
}

module.exports.reports_driver_get = async (req, res) => {
    const drivers = await Drivers.find()
    res.render('reports/reportsDriver', {drivers})
}

module.exports.reports_car_get = async (req, res) => {
    const cars = await Cars.find()
    res.render('reports/reportsCar', {cars})
}

module.exports.reports_assign_get = async (req, res) => {
    const assignD = await Assign.find()
    res.render('reports/reportsAssignD', {assignD})
}

module.exports.reports_tasks_get = async (req, res) => {
    const tasks = await Tasks.find()
    res.render('reports/reportsTask', {tasks, moment})
}