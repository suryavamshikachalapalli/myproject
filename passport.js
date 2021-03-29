const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


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