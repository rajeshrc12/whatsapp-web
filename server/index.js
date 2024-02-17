const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());
const client = new MongoClient(process.env.DB_URI);
const database = client.db(process.env.DB_NAME);
const users = database.collection("users");
app.post("/", async (req, res) => {
  try {
    const user = await users.findOne({ name: req.body.user });
    if (!user) {
      const result = await users.insertOne({
        name: req.body.user,
        chat: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      if (result) res.status(200).send("New user created");
      else res.status(500).send("User not created");
    } else {
      res.status(200).send("User found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get("/logout", async (req, res) => {
  await client.close();
});

app.post("/users", async (req, res) => {
  if (req.body.user) {
    const result = await users.find({ name: { $ne: req.body.user } }).toArray();
    if (result) res.status(200).send(result);
    else res.status(200).send("No user found");
  } else {
    res.status(500).send("user name required");
  }
});

app.post("/sendmessage", async (req, res) => {
  const { message, receiptUser, currentUser } = req.body;
  if (message) {
    const bulkOperations = [
      {
        updateOne: {
          filter: { name: currentUser }, // Match condition for currentUser
          update: {
            $push: {
              chat: {
                message,
                mine: true,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            },
            $set: { updatedAt: new Date() },
          },
        },
      },
      {
        updateOne: {
          filter: { name: receiptUser }, // Match condition for receiptUser
          update: {
            $push: {
              chat: {
                message,
                mine: false,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            },
            $set: { updatedAt: new Date() },
          },
        },
      },
    ];

    const result = await users.bulkWrite(bulkOperations);

    if (result) res.status(200).send(result);
    else res.status(500).send("No user found");
  } else {
    res.status(500).send("user name required");
  }
});

app.post("/user", async (req, res) => {
  const { user } = req.body;
  if (user) {
    const result = await users.findOne({ name: user });
    if (result) res.status(200).send(result);
    else res.status(500).send("No user found");
  } else {
    res.status(500).send("user name required");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
