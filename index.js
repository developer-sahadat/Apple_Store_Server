const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://phonesy:2RMvZrsFuGIpqVOj@cluster0.czcbx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  console.log("hello");
  // perform actions on the collection object
  client.close();
});

app.get("/", (req, res) => {
  res.send("Everything is fine");
});

app.listen(port, () => {
  console.log(port);
});

//phonesy
//2RMvZrsFuGIpqVOj
