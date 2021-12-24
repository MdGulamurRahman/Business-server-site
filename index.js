const express = require("express");
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jsdem.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("business-website");
      const servicesCollection = database.collection("services");
      // Query for a movie that has the title 'The Room'
     app.get("/services", async (req, res)=>{
         const result = await servicesCollection.find({}).toArray();
         console.log(result)
         res.json(result)
     })
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('Hello world')
})
app.listen(port, ()=>{
    console.log('business server is runinng', port)
})