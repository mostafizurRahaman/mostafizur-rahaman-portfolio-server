const express =require('express'); 
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors'); 

require('dotenv').config(); 


const app = express(); 
const port = process.env.PORT || 5000; 

// middle ware here: 
app.use(express.json()); 
app.use(cors()); 




// database code start from here: 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4nkvsmn.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri); 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
   try{
      
      const projectCollection = client.db("Portfolio").collection('projects'); 
      app.get('/projects', async(req, res)=>{
         const query = {}; 
         const projects =await projectCollection.find(query).toArray(); 
            res.send(projects); 
      })

      app.get("/projects/:id", async(req, res)=>{
         const id = req.params.id; 
         console.log(id);
         const query = {_id: ObjectId(id)}; 
         const project = await projectCollection.findOne(query); 
         res.send(project);
      })


   }
   finally{
      
   }
}


run().catch(err => console.log(err)); 


// main api/ route: 
app.get('/', (req,res)=>{
   res.send('Mostafizur Rahaman Port Portfolio server is running now ')
})


app.listen(port, ()=>{
   console.log(`Mostafizur Rahaman Portfolio server is running on ${port}`)
})
