const mongooes = require('mongoose')


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