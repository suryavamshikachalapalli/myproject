const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const path = require('path')
//require("./config/dbcon");




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

// bodyparser -json
app.use(express.json());
app.use(express.urlencoded({ extended : false}))




 //Routers : express routers

//app.use('/', require('./routes/index'));
//app.use('/users', require('./routes/users'));


//route app
app.get ('/', (req,res) => {
    res.render('index.ejs')
    //, {users: 'id'})
})

app.get('/login', (req,res) => res.render('login'));



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
       
        const User = await userData.save(); //issue
            //  res.status(201).redirect('/login') 
              //   console.log(req.body)
       // res.send(req.body)
       // next()
       res.writeHead(200, {
           "Set-Cookie":"token=encryptedstring; HTTPonly",
           "Access-Control-Allow-Credentials" : "true"
       
       })
       .send("welcoem");
    } 
    
    catch(error){
        res.status(400).redirect('/')


    }

})

 
 
 
 // listen to 3000 
 //app.listen(3000);
 const PORT = process.env.PORT || 3000;
 app.listen(PORT , console.log(`server started on port` , {PORT})); 