const stores = require('../models/Store')
const cars = require('../models/Cars')
const driver = require('../models/Driver')
const tasks = require('../models/task')

module.exports.get_Home = async (req, res) => {
    try{
        const Cars = await cars.find()
        const Drivers = await driver.find()
        const Tasks = await tasks.find()
        const Stores = await stores.find({"storeType" : "Store"})
        const Min_Stores = await stores.find({"storeType" : "Mini-Store"})
        const completeTasks = await tasks.find({"status": "complete"})
        const TaskPending = await tasks.find({"status": "pending"})
        
        res.render('home', {Stores,Min_Stores , Cars, Drivers, Tasks, completeTasks, TaskPending})
    }catch(err){
        console.log(err)
    }
    
}
