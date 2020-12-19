const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverSchema = new Schema({
    fullName: {
        type: String,
        // required: true
    },
    PhoneNumber: {
        type: String,
        // required: true
    },
    Address: {
        type: String,
        // required:true
    },
    ContectPersonName: {
      type: String,
    //   required: true  
    },
    ContactPersonPhone: {
        type: String,
        // required: true
    },
    // https://mongoosejs.com/docs/schematypes.html#buffers
    img: {
        type: Buffer,
        // required: true
    },
    imgType: {
        type: String,
        // required: true
    },
    img2: {
        type: Buffer,
        // required: true
    },
    imgType2: {
        type: String,
        // required: true
    }
    
},{timestamps: true});
// https://mongoosejs.com/docs/tutorials/virtuals.html
// a virtual is a property that is not stored in MongoDB. Virtuals are typically used for computed properties on documents.
// IT WILL GIVE US OUR IMAGE SOURCE THAT WE WILL USE IN OUT IMG TAG
driverSchema.virtual('coverImagePath').get(function (){
    if(this.img != null && this.imgType != null){
        return `data:${this.imgType};charset=utf-8;base64,${this.img.toString('base64')}`;
    }
    
})
driverSchema.virtual('coverImagePath2').get(function (){
    if(this.img2 != null && this.imgType2 != null){
        return `data:${this.imgType2};charset=utf-8;base64,${this.img2.toString('base64')}`;
    }
    
})



module.exports = mongoose.model('Driver', driverSchema);