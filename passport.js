const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

//user model
const user = require('./models/users');

module.exports = function(passport){ 
    passport.use(
        new LocalStrategy({usernameField:'email', passwordField:'password'},(email,password,done) => { //find user present or not
            user.findOne({
                email:email
            }).then(user => {
                if(!user){
                    return done(null, false, {message: 'user not found.Please signup!'});
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;
                    if (isMatch){
                        return done(null,user);
                    }else{
                        return done(null, false, {message: 'Please check your password'}) 
                    }
                });

            });
        })
    );
    passport.serializeUser(function(user, done){
        done(null, user_id);
    });
    passport.deserializerUser(function(user_id,done){
        user.findById(user_id, function(err,user){
            done(err,null);
        });
    });
}
/*

function initialize(passport, getUserByEmail, getUserById) {
  // call to authenticate email and password
  // done : internal passportjs to authenticate user email and password
    const authenticateUser =  async(email,password, done) => {
      //get user and compare with password
        const user = getUserByEmail(email)
        if(user == null){
            return done(null ,false, {message : "please register"})
        }
        try{
            if (await bcryprt.compare(password, user.password)){
            return done(null, user)
        }
        else{
            return done(null, false ,{message: " please check password"})
        }
    }
        catch(err){
            return done(err)

        }

    }
passport.use(new LocalStrategy({usernameField : 'email'}, authenticateUser))
//takes 
passport.serializeUser((user , done) => done(null, user.id ))
passport.deserializeUser((id, done) => {
     return login(null, getUserById(id))}

)}


module.exports = initialize
*/