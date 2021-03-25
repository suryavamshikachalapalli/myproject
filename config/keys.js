module.exports={
    MongoURI: 'mongodb+srv://surya789:surya789@cluster0.tf1o1.mongodb.net/test?retryWrites=true&w=majority'
}

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://surya789:surya789@cluster0.tf1o1.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("users");
  // perform actions on the collection object
  client.close();
});