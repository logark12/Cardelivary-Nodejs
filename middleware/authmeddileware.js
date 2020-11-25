
const jwt = require('jsonwebtoken');
const User = require('../models/User')

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'arkweb secret', async (err, decodedToken) => {
      if (err) {
        // console.log(err.message);
        res.redirect('/login');
      } else {
        // console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// cheking user Role
const UserRole = async (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'arkweb secret', async (err, decodedToken) => { 
      if (err) {
        // console.log(err.message);
        res.locals.Role = null;
      } else {
        let user = await User.findById(decodedToken.id);
        if (user){
          let Role = user.userType
          res.locals.Role = Role;
          next();
        }
      }
    })
    .catch(err => {
      console.log(err)
    });
  } else {
    
    if(req.url != '/login' || req.url != '/logout'){
      res.redirect('/login');
     }
    next();
  }
};

// check current user
const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'arkweb secret', async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };
  
  
  module.exports = { requireAuth, checkUser, UserRole };