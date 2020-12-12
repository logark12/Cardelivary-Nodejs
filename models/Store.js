const mongoose = require('mongoose')
const geocoder = require('../utils/geocoder')
const openGeocoder = require('node-open-geocoder');

const storeSchema = mongoose.Schema({
    storeName: {
        type: String,
        required: [true, 'pleas inter a store name']
    },
    storeMname: {
        type: String,
        required: [true, 'pleas inter store manager name']
    },
    storeMphone: {
        type: String,
        required: [true, 'pleas inter store manager phone'],
        minlength: [9, 'mobile number can`t be less the 9 digits']
    },
    storeType: {
        type: String,
        required: [true, 'pleas inter Store Type']
    },
    storeLocation1: {
        type: String,
        required: [true, 'please inter store location']
    },
    storeLocation2: {
        type: String,
        required: [true, 'please inter store location']
    },location:{
        type:{
            type:String,
            enum: ['Point']
        },
        coordinates:{
            type: [Number],
            index: '2dsphere'
        },
        
    }
},{timestamps: true});


storeSchema.pre('save', function(next) {
            this.location = {
                type: 'Point',
                coordinates: [this.storeLocation1, this.storeLocation2],

            }; 
            
        next();
});


module.exports = mongoose.model('store', storeSchema)