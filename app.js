const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const path = require('path')
//require("./config/dbcon");
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')
//const flash = require('express-flash')




const app = express();

//cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser());





// DB congif

const db = require('./config/keys').MongoURI;
const User= require("./models/User")

//connect to mongo
    mongoose
    .connect(
       db, {   
        useUnifiedTopology: true,
       useNewUrlParser: true,
})

.then(() => console.log('DB Connected!'))
.catch(err => {
    console.log({err});

}); 

//view and partials folder
const views_path = path.join(__dirname, "../views");
app.use(express.static(views_path));
const partials_path = path.join(__dirname, "../views/partilas");

//EJS (embeded jvascript)
//setting view engine   
app.use(expressLayouts)
app.set('view engine' ,'ejs')
//passport 
//const users = []
const initializePassport = require('./passport')


initializePassport(passport, 
    email => users.find(user => user.email === email),
    id => users.find(users => user.id === id)
)

const users = []

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  



// bodyparser -json
app.use(express.json());
app.use(express.urlencoded({ extended : false}))
//flash
app.use(flash())    
app.use(session({ 
    secret: process.env.SESSION_SECRET,
    
    resave: true,
    saveUninitialized: true
  //  resave: false,
   // saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


 //Routers : express routers

//app.use('/', require('./routes/index'));
//app.use('/users', require('./routes/users'));


//route app
app.get ('/', (req,res) => {
    res.render('index.ejs')
    //, {users: 'id'})
})

app.get('/login', (req,res) => res.render('login'));

app.post('/login',     
passport.authenticate('local', { 
    successRedirect: '/logout',
    failureRediret: '/login'  ,
    //failureFlash : true
} )
    )


app.get('/register', (req,res) => res.render('register'));
// handler 
//json
/*
router.post('/register',(req,res) => {
    const body = req.body

    res.json({
        confirmation: 'success',
        data:body
    })
}) 
*/
//database 
app.post ('/register', async(req,res,next) => {
    console.log('helllo')
    try{
     
       const password = req.body.password
       const cpassword = req.body.cpassword

        
            if (password === cpassword){

                const userData = new User({
                    username: req.body.username,
                    password: req.body.password,
                    password: req.body.cpassword,
                    company: req.body.company,
                    industry: req.body.industry,
                    hear: req.body.hear,
                    email: req.body.email,
                    phone: req.body.phone,
                    track: req.body.track, 

            });
        }
                   
        else{
            res.send("Check ur password")
        }
       
       // const User = await userData.save(); //issue
              res.status(201).redirect('/login') 
                console.log(req.body)
        res.send(req.body)
       // next()
     /*  res.writeHead(200, {
           "Set-Cookie":"token=encryptedstring; HTTPonly",
           "Access-Control-Allow-Credentials" : "true" */
       
       
       
    } 
    
    catch(error){
        res.status(400).redirect('/')


    }

})
//reset
app.get('/reset.ejs' ,(req,res) => {
    res.render('reset.ejs')
})
app.post('/reset', (req,res) => {
    res.redirect('/login')
})
//logout
app.get('/logout', (req,res) => {
    res.render('logout.ejs', 
  
    {users : 'name'} )
   
console.log(users)
})
app.post('/logout', 
    
passport.authenticate('local', { 
    successRedirect: '/logout',
    failureRediret: '/login'  ,
    
} )
)
 
 
 
 // listen to 3000 
 //app.listen(3000);
 const PORT = process.env.PORT || 3000;
 app.listen(PORT , console.log(`server started on port` , {PORT})); 