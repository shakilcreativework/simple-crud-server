// dns problem solve
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

// mongodb+srv://simpleCRUD:<db_password>@cluster0.68fcvxk.mongodb.net/?appName=Cluster0
// simpleCRUD
// ZFJx08eSidzqTK6e

// middleware
app.use(cors());
app.use(express.json());

// mongodb start -------------------------------------------------------------------------------------------
const uri = `mongodb+srv://simpleCRUD:ZFJx08eSidzqTK6e@cluster0.68fcvxk.mongodb.net/?appName=Cluster0`;
// const uri = `mongodb+srv://simpleCRUD:<db_password>@cluster0.68fcvxk.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {
    await client.connect();
    // --------------start code--------------
    const db = client.db("simpleCrud");
    const userCollection = db.collection("users");

    // get users
    app.get("/users", async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id)
      }
      const user = await userCollection.findOne(query);
      console.log("user id", id);
      res.send(user);
    });

    // delete
    app.delete('/users/:id', async(req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id)
      }
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
    // --------------ends code---------------
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // await client.close();
  }
};

run().catch(console.dir);
// mongodb end -------------------------------------------------------------------------------------------

app.get("/", (req, res) => {
  res.send("Simple CRUD server is running...");
});

app.listen(port, () => {
  console.log("Simple CRUD server is running on port", port);
});
