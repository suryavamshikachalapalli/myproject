const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const path = require('path')

const app = express();

// DB congif

const db = require('./config/keys').MongoURI;
//const User= require("./models/User")

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

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));



 
 
 
 // listen to 3000 
 //app.listen(3000);
 const PORT = process.env.PORT || 3000;
 app.listen(PORT , console.log(`server started on port` , {PORT})); 