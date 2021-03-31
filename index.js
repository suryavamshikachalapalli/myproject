require('dotenv').config()
  

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const assert = require('assert')
const mongooes = require('mongoose')
const mongodb = require('mongodb')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')



//////////////APP INITILIZATION
const app = express();

//////////////////////////////auth
require('./config/auth')
//////////////////database///////////////
const passportLocalMongoose = require('passport-local-mongoose');
mongooes.connect('mongodb://localhost:27017/app', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true 
});
var db = mongooes.connection;
db.on('error', () => console.log("Please check the connection"))
db.once('open',() => console.log("Connected successfully")) 
//////////////////model: schema collection ///////
const User = require("./models/users");
 ///////////////////body and cookie parser///////
 var bodyParser = require('body-parser')
 ///const cookieParser = require('cookie-parser')

//app.use(express.cookieParser());
//app.use(express.bodyParser());
//////////////////json////////////
app.use(express.json());

////////////////passport PASPORT///////
require('./passport')(passport)
LocalStrategy = require("passport-local")

// view engine , ejs , layouts///////
app.use(expressLayouts)
app.set('view engine' ,'ejs') 
app.use(express.urlencoded({extended : false}))
///////////secret 

app.use(session({
    secret : 'secret',
    resave: true,
    saveUninitialized:false
}))

////////////passport//////////
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
//passport.use(new LocalStrategy(User.authenticate()));
//passport.use(User.createStrategy());
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(user.deserializeUser());

////////////////////////////////////routes
app.get('/', (req,res)=>{
    res.render('home')
})
//login handler
app.get('/login', (req,res)=>{
    console.log("login")
    res.render('login')
   // res.json({message: req.flash('loginMessage')});
})

app.post('/login', 
passport.authenticate('local',{
    
    successRedirect:'/dashboard',
    failureRedirect:'/login',
    failureFlash: true,
    
}),

//res handler
app.get('/res', (req,res)=>{res.render('res') }),
 // working
 app.post('/res', (req,res)=>{
            console.log('signup page')      
            username = req.body.username;
            password = req.body.password;
            cpassword = req.body.cpassword;
            company = req.body.company;
            industry = req.body.industry;
            hear = req.body.hear;
            email = req.body.email;
            phone = req.body.phone;
            track = req.body.track;
            coupon = req.body.coupon; 
            uname = req.body.uname;
            address = req.body.address; 
            card = req.body.card
                            const user =
                            {
                               "username": username,
                                "password": password,
                                "cpassword": cpassword,
                                "company": company,
                                "industry": industry,
                                "hear": hear,
                                "email": email,
                                "phone": phone,
                                "track": track,
                                "coupon": coupon,
                                "uname": uname,
                                "address": address,
                                "card": card
        
                            }
                            db.collection('user').insertOne(user,(err,collection) => {
                                if(err){
                                    throw err;
                                }
                                console.log("collection created with records")
                                console.log(user)
                            });
                            return res.redirect('/login')
                         
                        })); 
                       



   

//Dashboard

//app.get('/dashboard', (req,res)=>{
   // res.render('dashboard')
//}) 

app.get('/dashboard', isLoggedIn, (req, res) =>
   {
    res.json({user : req.user});
  }); 


//logout
app.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
  });

  function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
    return next();
    res.redirect('/');
};

//reset passpoers
app.get('/reset', (req,res)=>{
    res.render('reset')
})
//APP LISTENING TO PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT , console.log(`server started on port` , {PORT}));

//app.listen(3001)