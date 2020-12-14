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
    if (driver){
        this.Driver = driver._id
        next();
    }
    throw Error('NO driver have this NUMBER')
    
})



taskModel = mongoose.model('task', taskSchema)
module.exports = taskModel


