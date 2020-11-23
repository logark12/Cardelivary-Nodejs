const User = require('../models/User');
const jwt = require('jsonwebtoken');


const ErrorHandler = (err) =>{

    const errors = {username: "", email:"", password: ""}

    //incorrect email
    if(err.message === 'incorrect email'){
        errors.email = 'this email is not registred'
        return errors
    }
    // incorrect password
    if(err.message === 'incorrect password'){
        errors.password = 'this password is incorrect'
        return errors
    }

    //check dublicate
    if(err.code === 11000){
        errors.email = 'this email is allready registred'
        return errors
    }
    
    if (err.message.includes('user validation failed')) {
        // console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
          // console.log(val);
        //   console.log(properties);
          errors[properties.path] = properties.message;
        });
      }
    
      return errors;
}
const MaxAge = 2 *24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({id},'arkweb secret', {
        expiresIn: MaxAge
    })
}

module.exports.signup_get = (req, res) => {
    res.render('UserAuth/signup')
};

module.exports.login_get = (req, res) =>{
    res.render('UserAuth/login')
};

module.exports.signup_post = async (req, res) =>{
    const {username, email, password} = req.body
    try {
        const user = await User.create({username, email, password})
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: MaxAge * 1000})
        res.status(201).json({user: user._id})
    } catch (err) {
        const errors = ErrorHandler(err);
        console.log(err)
        res.status(400).json({errors})
    }
};

module.exports.login_post = async (req, res) =>{
    const { email, password } = req.body;
    console.log(email, password, '....')
    try {
      const user = await User.login(email, password)
      const token = createToken(user._id)
      res.cookie('jwt', token, {httpOnly:true, maxAge: MaxAge * 1000})
      res.status(200).json({user: user._id});
    } catch (err) {
      const errors = ErrorHandler(err);
      console.log(errors)
      res.status(400).json({ errors });
    }
  };

  

module.exports.logout_get = (req, res) =>{
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/')
}

module.exports.faqs_get = (req, res) => {
    res.render('faqs')
}