const mongoose = require('mongoose');
const {isEmail} = require('validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, 'pleas inter a username']
    },
    email: {
        type: String,
        required: [ true, 'pleas inter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'pleas inter valid email']
    },
    password: {
        type: String,
        required: [true, 'pleas inter a password'],
        minlength: [6, 'minimum password lenght is 6 chracters']
    },
    userType:{
        type: String,
        enum: ['A', 'U'],
        required: true,
    }
},{timestamps: true});

userSchema.pre('save', async function(next){
    console.log(this.password)
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

// create static function
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email})
    if(user){
      const auth = await bcrypt.compare(password, user.password)
      if(auth){
        return user
      }
      throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

module.exports = mongoose.model('user', userSchema)

