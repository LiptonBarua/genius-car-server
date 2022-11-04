const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = 5000;
require('dotenv').config()

app.use(cors())
app.use(express.json());


app.get('/', (req, res)=>{
    res.send('genius car server is running')
});



const uri = `mongodb+srv://${process.env.GENIUS_USER}:${process.env.GENIUS_PASSWORD}@cluster0.ebocqiq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
     const serviceCollection = client.db('geniusCar').collection('services');
     const orderCollection = client.db('geniusCar').collection('orders');

     app.get('/services', async(req, res)=>{
        const query ={}
        const cursor = serviceCollection.find(query);
        const services = await cursor.toArray();
        res.send(services)
     })

     app.get('/services/:id', async(req, res)=>{
        const id =req.params.id;
        const query = {_id:ObjectId(id)}
        const service = await serviceCollection.findOne(query);
        res.send(service);
     })

     app.post('/orders', async(req, res)=>{
        const order = req.body;
        const result = await orderCollection.insertOne(order);
        res.send(result)
    })

    app.get('/orders', async(req, res)=>{
    //   console.log(req.query.email)
      let query = {}
      if(req.query.email){
        query={
            email: req.query.email
        }
      }
      console.log(query)
      const cursor = orderCollection.find(query);
      const orders = await cursor.toArray();
      console.log(orders)
      res.send(orders)
    })

    app.delete('/orders/:id', async(req, res)=>{
        const id = req.params.id;
        const query ={_id: ObjectId(id)};
        const result = await orderCollection.deleteOne(query);
        res.send(result);
    })

    app.patch('/orders/:id', async(req, res)=>{
        const id=req.params.id;
        const status = req.body.status;
        const query ={_id: ObjectId(id)}
        const updatedDos ={
            $set:{
             status: status
            }
               }
               const result = await orderCollection.updateOne(query, updatedDos);
               res.send(result)
    })
    }
 
    finally{

    }
} 
run().catch(error =>console.log(error));

app.listen(port, ()=>{
    console.log(`genius car server is running ${port}`);
})