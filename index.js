const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.czcbx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const inventoryCollection = client.db("phonesy").collection("inventory");

    /*___________All data load API code start here_____________*/
    app.get("/inventory", async (req, res) => {
      const query = {};
      const cursor = inventoryCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    /*___________inventory item add API code start here_____________*/
    app.post("/inventory", async (req, res) => {
      const doc = req.body;
      const result = await inventoryCollection.insertOne(doc);
      res.send(result);
    });
    /*___________ My inventory items  API code start here_____________*/
    app.get("/my-items", async (req, res) => {
      const email = req.query.email;
      const query = { email };
      console.log(query);
      const cursor = inventoryCollection.find(query);
      const myItems = await cursor.toArray();
      res.send(myItems);
    });
    /*___________ My inventory items  API code start here_____________*/
    app.delete("/my-items/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await inventoryCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Everything is fine");
});

app.listen(port, () => {
  console.log(port);
});
