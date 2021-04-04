require('dotenv').config()
  
/*
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
//srequire('./config/auth')
///////////////////database///////////////
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
 const cookieParser = require('cookie-parser');

//////////////////json////////////
app.use(express.json());
//app.use(bodyParser.json());

////////////////passport PASPORT///////


require('./passport')(passport)
//app.use(bodyParser.json());

app.use(cookieParser());
LocalStrategy = require("passport-local")

// view engine , ejs , layouts///////
app.use(expressLayouts)
app.set('view engine' ,'ejs') 
app.use(bodyParser.urlencoded({extended : true}))
//app.use(express.urlencoded({extended : false}))
///////////secret 

app.use(session({
    secret : 'secret',
    resave: true,
    saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

////////////passport//////////

//passport.use(new LocalStrategy(User.authenticate()));
/*
passport.use('local', new LocalStrategy({
    usernameField:'email',
    passwordField: 'password',
    passReqToCallback: true
})), */
//passport.use(User.createStrategy());
//passport.serializeUser(User.serializeUser()),
//passport.deserializeUser(user.deserializeUser()),
/*
////////////////////////////////////routes
app.get('/', (req,res)=>{
    res.render('home')
}),
////////////////////////////////////////login handler
app.get('/login', (req,res)=>{
    console.log("login")
    res.render('login')
   // res.json({message: req.flash('loginMessage')});
}),

app.post('/login',  
passport.authenticate('local', passport.authenticate('login',{
   
    successRedirect:'/dashboard',
    failureRedirect:'/login',
    failureFlash: true
    
}))),

/////////////////////////////////res handler
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
                         
                        }),

//////////////////////////////////////Dashboard

//app.get('/dashboard', (req,res)=>{
   // res.render('dashboard')
//}) 
function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
    return next();
    res.redirect('/');
},  

app.get('/dashboard', (req, res) =>
   {
    res.render('dashboard')
  }),


//////////////////////////////////////logout
app.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
  }),

 

//////////////////////////////////reset passpoers
app.get('/reset', (req,res)=>{
    res.render('reset')
});
///////////////////APP LISTENING TO PORT //app.listen(3001)
const PORT = process.env.PORT || 3001;
app.listen(PORT , console.log(`server started on port` , {PORT}));
*/


///////////////////////////////////////////////////////jwt token
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const User = require('./models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'secretkeycanbeanythingtoverify'

//const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');
const mongodb = require('mongodb')
mongoose.connect('mongodb://localhost:27017/app', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true 
});
var db = mongoose.connection;
db.on('error', () => console.log("Please check the connection"))
db.once('open',() => console.log("Connected successfully")) 

const app = express()
app.set('view engine' ,'ejs') 
app.use(express.urlencoded({extended : false}))

app.use(bodyParser.json())
////////GET///////
app.get('/', (req,res)=>{
    res.render('home')
})
app.get('/login', (req,res)=>{
    res.render('login')
})
app.get('/res', (req,res)=>{
    res.render('res')
})
app.get('/reset', (req,res)=>{
    res.render('reset')
})
app.get('/dashboard', (req,res)=>{
    res.render('dashboard')
})
app.get('/logout', (req, res) => {
    res.redirect('/');
  }),

/////res
app.post('/res', async (req, res) => {
	const { username, password: plainTextPassword , cpassword,company, industry,hear, email,phone,track , coupon, uname, address, card} = req.body
    // const{username, password: plainTextPassword} = req.body
	if (!username || !plainTextPassword) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	
	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			                    username,
                                password,
                               cpassword,
                                company,
                                industry,
                                email,
                                phone,
                                track,
                                coupon,
                                uname,
                                address,
                                card 
                                 
		})
    //    const savedUser = user.save();
		console.log('User created successfully: ', response)
	} catch (error) {
        res.status(400).send(error);
       // console.log(JSON.stringify(error))
		if (error.code === 11000) {
		{	
            return res.redirect('/login');
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		//throw error
	} 

	// res.redirect('/login')
}
})
/////login
app.post('/login', async (req, res) => {
    const{username, password: plainTextPassword} = req.body
	//const { username, password: plainTextPassword , cpassword,company, industry,hear, email,phone,track , coupon, uname, address, card} = req.body
	const user = await User.findOne({ username })

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid user' })
	}

	if (await bcrypt.compare(plainTextPassword, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)

		return res.redirect('/dashboard')
	}

	res.json({ status: 'error', error: 'Invalid info' })
    
})
/////reset

app.listen(3001, () => {
	console.log('Server up at 3001')
})