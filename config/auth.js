module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please log in to access!');
      res.redirect('/users/login');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/dashboard');      
    }
  };
/*const mongoose = require('mongoose');
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

mongoose.connect("mongodb://localhost:27017/app", //default mongooes connection with db name
{    
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true    
})   //call back function 
    .then(() =>
    {
        console.log("DataBase connected..."); // connect got establishes btw db and node        
    })
    .catch((e) =>
    {
        console.log("Please check the database connection")
    }) */