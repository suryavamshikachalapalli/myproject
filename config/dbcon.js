const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/testUser",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=> {
    console.log(`Successfully connected to db`)
}).catch((e)=>{
    console.log(`please check the connection`)

})