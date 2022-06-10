const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://portfolio:${process.env.USER_PASS}@portfolio.mrww6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){
    try{
        await client.connect();
        console.log('db connected');
        const projectsCollection = client.db('portfolio').collection('projects');
        

        app.get('/projects',async(req,res)=>{
            const query = {};
            const cursor = projectsCollection.find(query);
            const projects = await cursor.toArray();
            res.send(projects);
        });


        app.get('/projects/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)};
            const projects = await projectsCollection.findOne(query);
            res.send(projects);
        })
    }
    finally{

    }
}
run().catch(console.dir);


app.get('/', (req,res)=>{
    res.send('Portfolio Server Running')
})



app.listen(port,()=>{
    console.log('listenning to port', port);
})