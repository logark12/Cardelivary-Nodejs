const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    carName: {
        type: String,
        required: true
    },
    CarType: {
        type: String,
        required: true
    },
    // https://mongoosejs.com/docs/schematypes.html#buffers
    img: {
        type: Buffer,
        required: true
    },
    imgType: {
        type: String,
        required: true
    },
    img2: {
        type: Buffer,
        required: true
    },
    imgType2: {
        type: String,
        required: true
    }
    
});
// https://mongoosejs.com/docs/tutorials/virtuals.html
// a virtual is a property that is not stored in MongoDB. Virtuals are typically used for computed properties on documents.
// IT WILL GIVE US OUR IMAGE SOURCE THAT WE WILL USE IN OUT IMG TAG
CarSchema.virtual('coverImagePath').get(function (){
    if(this.img != null && this.imgType != null){
        return `data:${this.imgType};charset=utf-8;base64,${this.img.toString('base64')}`;
    }
    
})
CarSchema.virtual('coverImagePath2').get(function (){
    if(this.img2 != null && this.imgType2 != null){
        return `data:${this.imgType2};charset=utf-8;base64,${this.img2.toString('base64')}`;
    }
    
})



module.exports = mongoose.model('Car', CarSchema);