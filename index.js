const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = 5000;
require('dotenv').config()

app.use(cors())
app.use(express.json());


app.get('/', (req, res)=>{
    res.send('genius car server is running')
});



const uri = `mongodb+srv://process.env.GENIUS_USER:process.env.GENIUS_PASSWORD@cluster0.ebocqiq.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.listen(port, ()=>{
    console.log(`genius car server is running ${port}`);
})