const express = require('express')
const assert = require('assert')
const mongooes = require('mongoose')
const mongodb = require('mongodb')
const bcrypt = require('bcrypt')
//APP INITILIZATION
const app = express();


//db :DATA BASE connction
//require('./db/con')
mongooes.connect('mongodb://localhost:27017/app', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
   // useCreateIndex: true 
});
var db = mongooes.connection;
db.on('error', () => console.log("Please check the connection"))
db.once('open',() => console.log("Connected successfully"))
//model: schema collection
const User = require("./models/users");
 //body
 var bodyParser = require('body-parser')
//json
app.use(express.json());
app.use(express.urlencoded({extended:false}))

// view engine , ejs
app.set('view engine' ,'ejs') 

//routes
app.get('/', (req,res)=>{
    res.render('home')
})
//login handler
app.get('/login', (req,res)=>{
    res.render('login')
})

app.get('/res', (req,res)=>{
        res.render('res') })

 app.post('/res', (req,res)=>{
            console.log('signup page')
            
                             
        
                            var data = {
                                username: req.body.username,
                                password: req.body.password,
                                cpassword: req.body.cpassword,
                                company: req.body.company,
                                industry: req.body.industry,
                                hear: req.body.hear,
                                email: req.body.email,
                                phone: req.body.phone,
                                track: req.body.track,
                                coupon: req.body.coupon, 
                                uname: req.body.uname,
                                address: req.body.address, 
                                card: req.body.card
        
                            }
                            db.collection('user').insertOne(data,(err,collection) => {
                                if(err){
                                    throw err;
                                }
                                console.log("collection created with records")
                            });
                            return res.redirect('/login')
                            console.log(data)
                        })
/*
app.post('/login',  
        passport.authenticate('local', {
          successRedirect: '/logout',
          failureRedirect: '/login',
          //failureFlash: true
        }), 
        //function(req, res) {}
      );
*/
//sign handler
/*
app.get('/signup', (req,res)=>{
    res.render('signup')
})
app.post('/signup', async(req,res)=>{
    console.log('signup page')
                     

                    var data = {
                        username: req.body.username,
                        password: req.body.password,
                        cpassword: req.body.cpassword,
                        company: req.body.company,
                        industry: req.body.industry,
                        hear: req.body.hear,
                        email: req.body.email,
                        phone: req.body.phone,
                        track: req.body.track,
                        coupon: req.body.coupon, 
                        uname: req.body.uname,
                        address: req.body.address, 
                        card: req.body.card

                    }
                    db.collection('user').insertOne(data,(err,collection) => {
                        if(err){
                            throw err;
                        }
                        console.log("collection created with records")
                    });
                    return res.redirect('/login')
                 }) */
   /* try{
     //creat users
       const password = req.body.password
       const cpassword = req.body.Retypepassword

        
            if (password === cpassword){ // validation 1

               const user  = new User({
                    username: req.body.username,
                    password: password,
                    password: cpassword,
                    company: req.body.company,
                    industry: req.body.industry,
                    hear: req.body.hear,
                    email: req.body.email,
                    phone: req.body.phone,
                    track: req.body.track, 
                    coupon: req.body.coupon, 
                    uname: req.body.uname, 
                    address: req.body.address, 
                    card: req.body.card, 

            })
         //   const app =  await  userSignup.save();//to save in db
        const data =  await  user.save();//to save in db
             res.status(201).redirect('/login') ;
               console.log(req.body)   
    } 
    else{
        req.send("Check ur password")
    }
} 
    
    catch(error){
        res.status(400).redirect('/')   
        console.log('error')

    }    */ 
       
//})

//APP LISTENING TO PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT , console.log(`server started on port` , {PORT}));