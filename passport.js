//const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
/*
//user model
const user = require('./models/users');

module.exports = function(passport){ 
    passport.use( // call to auth user email and password
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

    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(function(id,done){
        User.findById(id, function(err,user){
            done(err,user);
        }); 
    });
}
*/
var LocalStrategy = require('passport-local').Strategy;
const user = require('./models/users');
module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    passport.use('res',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback:true
    },
        function(req,email, password, done) {
            User.findOne({ email: email }, function(err, user) {
            if (err) { return done(err); }
            if (user) {
                return done(null, false, req.flash('resMessage','Email is already exhisting! Please login...' ));
            }else{
                var newUser = new User();
                newUser.email = email;
                newUser.password = newUser.generateHash(password);
                newUser.save(function(err){
                if(err) throw err;
                return done(null,newUser);
            });
            }
            });
    }));

    passport.use('login',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback:true
    },
        function(req,email, password, done) {
            User.findOne({ email: email }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, req.flash('loginMessage','Invalide user' ));
            }
            if (!user.validPassword(password)) {
                return done(null, false,  req.flash('loginMessage','Incorrect password !' ));
            }
            return done(null, user);
            });
        }
    ));


};