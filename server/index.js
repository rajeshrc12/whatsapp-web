const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { MongoClient, GridFSBucket, ObjectId } = require("mongodb");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");

const app = express();
const port = 3001; // Port for MongoDB API
const socketPort = 3002; // Port for Socket.IO server

const upload = multer();
require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());

const client = new MongoClient(process.env.DB_URI);
const database = client.db(process.env.DB_NAME);
const users = database.collection("users");
const fschunks = database.collection("fs.chunks");
const fsfiles = database.collection("fs.files");
// Create a GridFS bucket
const bucket = new GridFSBucket(database);
// Configure CORS for Socket.IO server
const ioApp = express();
ioApp.use(cors());

// Start Socket.IO server
const ioServer = require("http").createServer(ioApp);

const io = new Server(ioServer, {
  cors: {
    origin: "*", // Allow requests from all origins, you can restrict this to your client's origin
    methods: ["GET", "POST"], // Allow only GET and POST requests
  },
});
ioServer.listen(socketPort, () => {
  console.log(`Socket.IO server listening at http://localhost:${socketPort}`);
});

io.on("connection", (socket) => {
  socket.on("server", (args) => {
    socket.broadcast.emit("client", args);
  });
});

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
const sendMessage = async ({
  message,
  receiptUser,
  currentUser,
  type,
  reply,
}) => {
  const messageId = new ObjectId();
  const bulkOperations = [
    {
      updateOne: {
        filter: { name: currentUser }, // Match condition for currentUser
        update: {
          $push: {
            chat: {
              _id: messageId,
              from: currentUser,
              to: receiptUser,
              message,
              emoji: [],
              type,
              mine: true,
              reply,
              createdAt: new Date(),
              updatedAt: new Date(),
              pin: false,
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
              _id: messageId,
              from: currentUser,
              to: receiptUser,
              message,
              emoji: [],
              type,
              mine: false,
              reply,
              createdAt: new Date(),
              updatedAt: new Date(),
              pin: false,
            },
          },
          $set: { updatedAt: new Date() },
        },
      },
    },
  ];
  const result = await users.bulkWrite(bulkOperations);
  return result;
};
app.post("/sendmessage", async (req, res) => {
  const { message, receiptUser, currentUser, type, reply } = req.body;
  if (message) {
    const result = sendMessage({
      message,
      receiptUser,
      currentUser,
      type,
      reply,
    });
    if (result) res.status(200).send(result);
    else res.status(500).send("No user found");
  } else {
    res.status(500).send("user name required");
  }
});

app.post("/sendmessagebulkmultipleusers", async (req, res) => {
  const { users: names, chats, currentUser } = req.body;
  if (names.length && chats.length && currentUser) {
    for (const user of names) {
      users.updateOne(
        { name: user },
        {
          $push: {
            chat: {
              $each: chats.map((chat) => {
                const temp = {
                  ...chat,
                  _id: new ObjectId(),
                  from: currentUser,
                  to: user,
                  emoji: [],
                  mine: false,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  pin: false,
                };
                if (temp.url) delete temp.url;
                return temp;
              }),
            },
          },
        }
      );
    }
    users.updateOne(
      { name: currentUser },
      {
        $push: {
          chat: {
            $each: chats.map((chat) => {
              const temp = {
                ...chat,
                _id: new ObjectId(),
                from: currentUser,
                to: currentUser,
                mine: true,
                emoji: [],
                createdAt: new Date(),
                updatedAt: new Date(),
                pin: false,
              };
              if (temp.url) delete temp.url;
              return temp;
            }),
          },
        },
      }
    );
    res.status(200).send("Message forwarded");
  } else {
    res.status(500).send("users,currentUser and chats required");
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

app.post("/pin", async (req, res) => {
  const { pin, _id, name, unpin } = req.body;
  console.log({ _id, name, unpin });
  if (name && _id && unpin) {
    const result = await users.updateOne(
      {
        name,
        "chat._id": new ObjectId(_id),
      },
      {
        $set: {
          "chat.$.pin": true,
        },
      }
    );
    const result2 = await users.updateOne(
      {
        name,
        "chat._id": new ObjectId(unpin._id),
      },
      {
        $set: {
          "chat.$.pin": false,
        },
      }
    );
    if (result) res.status(200).send(result);
    else res.status(500).send("Failed to pin message");
  } else {
    res.status(500).send("pin, name required");
  }
});

app.post("/delete", async (req, res) => {
  const { chatId, name, receiptUser } = req.body;
  if (name && chatId && receiptUser) {
    const result = await users.updateOne(
      {
        name,
        "chat._id": new ObjectId(chatId),
      },
      {
        $set: {
          "chat.$.type": "delete",
        },
      }
    );
    const result2 = await users.updateOne(
      {
        name: receiptUser,
        "chat._id": new ObjectId(chatId),
      },
      {
        $set: {
          "chat.$.type": "delete",
        },
      }
    );
    if (result) res.status(200).send(result);
    else res.status(500).send("Failed to delete message");
  } else {
    res.status(500).send("chatId and name required");
  }
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;
  const { receiptUser, currentUser } = JSON.parse(req.body.userData);
  console.log("ooo", file, { receiptUser, currentUser });
  if (file) {
    try {
      // Create a file in GridFS
      const uploadStream = bucket.openUploadStream(file.originalname);

      // Pipe the file buffer to the GridFS upload stream
      const resp = await uploadStream.end(file.buffer);
      if (resp.filename) {
        const response = sendMessage({
          receiptUser,
          currentUser,
          message: String(resp.id),
          type: file.mimetype.split("/")[0],
        });
        if (response) res.status(200).send("File uploaded");
        else res.status(500).send("Error occured while file uploading");
      } else res.status(500).send("upload failed");
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(500).send("file required");
  }
});

app.get("/clean", async (req, res) => {
  const response1 = await users.deleteMany({});
  const response2 = await fschunks.deleteMany({});
  const response3 = await fsfiles.deleteMany({});
  res.send({ response1, response2, response3 });
});

app.get("/download/:id", async (req, res) => {
  try {
    const fileId = req.params.id;
    const fileObjectId = new ObjectId(fileId);
    const file = await fsfiles.findOne({ _id: fileObjectId });
    console.log(file);
    const downloadStream = bucket.openDownloadStreamByName(file.filename);
    downloadStream.pipe(res);
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.post("/emoji", async (req, res) => {
  try {
    const { chatId, emoji, currentUser, selectedUser } = req.body;
    // Update emojiSymbol if emojiUser already exists in chat.emoji
    console.log({ chatId, emoji, currentUser, selectedUser });
    const updateResult = await users.updateOne(
      {
        name: currentUser,
        "chat._id": new ObjectId(chatId),
        "chat.emoji.emojiUser": currentUser,
      },
      { $set: { "chat.$.emoji.$[elem].emojiSymbol": emoji } },
      {
        arrayFilters: [{ "elem.emojiUser": currentUser }],
        upsert: false, // Do not insert a new document if no match is found
      }
    );

    // If no document was updated (meaning the emojiUser does not exist), add a new entry to chat.emoji
    if (updateResult.matchedCount === 0 || updateResult.modifiedCount === 0) {
      await users.updateOne(
        { name: currentUser, "chat._id": new ObjectId(chatId) },
        {
          $addToSet: {
            "chat.$.emoji": { emojiUser: currentUser, emojiSymbol: emoji },
          },
        }
      );
    }

    const updateResult1 = await users.updateOne(
      {
        name: selectedUser,
        "chat._id": new ObjectId(chatId),
        "chat.emoji.emojiUser": selectedUser,
      },
      { $set: { "chat.$.emoji.$[elem].emojiSymbol": emoji } },
      {
        arrayFilters: [{ "elem.emojiUser": selectedUser }],
        upsert: false, // Do not insert a new document if no match is found
      }
    );

    // If no document was updated (meaning the emojiUser does not exist), add a new entry to chat.emoji
    if (updateResult1.matchedCount === 0 || updateResult1.modifiedCount === 0) {
      await users.updateOne(
        { name: selectedUser, "chat._id": new ObjectId(chatId) },
        {
          $addToSet: {
            "chat.$.emoji": { emojiUser: selectedUser, emojiSymbol: emoji },
          },
        }
      );
    }
    console.log(updateResult, updateResult1);
    if (updateResult && updateResult1) res.status(200).send("Emoji updated");
    else res.status(500).send("Emoji not updated");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Start the main Express app
app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
