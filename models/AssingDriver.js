const mongoose = require('mongoose');
Schema = mongoose.Schema
const DriverModel = require('./Driver')
const CarModel = require('./Cars')

const AssingSchema = new Schema({
    Carname: {
        type: String,
        required: [true, 'Car is required'],
    },
    DriverPhone:{
        type: String,
        required: [true, 'Driver is required'],
    },
    Car:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        
    },
    Driver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        
        
    }   
},{timestamps: true});

AssingSchema.index({ Car: 1 }, { unique: true });
AssingSchema.index({ Driver: 1 }, { unique: true, sparse: true });

AssingSchema.pre('save', async function(next){
    const driver = await DriverModel.findOne({'PhoneNumber': this.DriverPhone});
    const car = await CarModel.findOne({'carName': this.Carname});
    console.log(driver._id, car._id)
    if (driver){
        this.Driver = driver._id
        
    }else{
        throw Error('NO driver have this NUMBER')
    }
    if (car){
        this.Car = car._id
        next();
    }
    throw Error('NO driver have this NUMBER')
    
})

const AssignModel = mongoose.model('AssignD', AssingSchema);
module.exports = AssignModel


const tasks = async () => {
    try {
        const task = await AssignModel.find({})
        .populate("Driver")
        .populate("Car")
        for(i= 0; i < task.length; i++){
            
            // 
            // console.log(task)
            
        }
        
        // console.log(task)
    } catch (err) {
        console.log(err)
    }
}

tasks()