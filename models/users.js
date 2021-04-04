var mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcryptjs')

const userSchema  = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      Retypepassword: {
        type: String,
      //  required: true
      },
      company: {
        type: String,
       // required: true
      },
      industry: {
        type: String,
        //required: true
      },
      hear: {
        type: String,
        //required: true
      },
      
      email: {
        type: String,
        required: true,
       unique: true
      
      },
      phone: {
        type: String,
       // required: true,
       //unique: true
      },
      track: {
        type: String,
      //  required: true
      },
      coupon: {
        type: Number,
     //   required: true
      },
      uname: {
        type: String,
    //    required: true
      },
      address: {
        city:{
       type: String,
      //  required: true
        },
        state:{
         type: String,
        //  required: true
          },
          zip:{
            type: String,
            //required: true
            }
      },
      card: {
        type: String,
       // required: true
      },


    
    });

//collection
const User = new mongoose.model("User", userSchema);
//User  = mongoose.model('User', userSchema);
//passport plugin
userSchema.plugin(passportLocalMongoose);

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model("User", userSchema);
   
