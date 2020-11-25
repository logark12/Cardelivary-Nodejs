const mongoose = require('mongoose');
const DriverModel = require('./Driver')
const taskSchema = mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
        
    },
    taskDescription: {
        type: String
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    teamMember: {
        type: String,
    },
    Driver:
        {type: mongoose.Schema.Types.ObjectId, ref: 'Driver'}
      
},{timestamps: true});

taskSchema.pre('save', async function(next){
    const driver = await DriverModel.findOne({'PhoneNumber': this.teamMember});
    // console.log(driver)
    if (driver){
        this.Driver = driver._id
        next();
    }
    throw Error('NO driver have this NUMBER')
    
})



taskModel = mongoose.model('task', taskSchema)
module.exports = taskModel

// const tasks = await taskModel.find({} , (err, result) => {
//     console.log(tasks)
// });

// const tasks = async () => {
//     try {
//         const task = await taskModel.find({})
//         .populate("Driver")
//         for(i= 0; i < task.length; i++){
            
//             const date = new Date()
//             // console.log(task[i].endDate)
//             if (task[i].endDate < date){
//                 task[i].status = 'complete'
//                 task[i].save()
                
//             }
//         }
        
//         // console.log(task)
//     } catch (err) {
//         console.log(err)
//     }
// }

