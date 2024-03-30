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
const chats = database.collection("chats");
const groups = database.collection("groups");
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
ioServer.listen(socketPort, async () => {
  console.log(`Socket.IO server listening at http://localhost:${socketPort}`);
});
let connectedUsers = [];

io.on("connection", async (socket) => {
  // socket.on("server", async (arg) => {});
  const all = await io.fetchSockets();
  for (const user of all) {
    const index = connectedUsers.findIndex(
      (u) => u.name === user.handshake.query.name
    );
    let openProfile = null;
    if (index > -1 && index !== undefined) {
      if (!!connectedUsers[index])
        openProfile = connectedUsers[index].openProfile;
      connectedUsers.splice(index, 1);
    }
    connectedUsers.push({
      id: user.id,
      name: user.handshake.query.name,
      openProfile,
    });
  }
  console.clear();
  // console.log("io.on('connection')", connectedUsers);
  socket.broadcast.emit("onlineUsers", connectedUsers);
  socket.on("disconnect", () => {
    connectedUsers = connectedUsers.filter((a) => a.id !== socket.id);
    socket.broadcast.emit("onlineUsers", connectedUsers);
    // console.log("from disconnect function, connected users", connectedUsers); // false
  });
});
app.post("/send", async (req, res) => {
  try {
    console.clear();
    // console.log("/send", connectedUsers);
    const { from, to, message } = req.body;
    const isUserOnline = connectedUsers.find((user) => user.name === to);
    const result = await chats.insertOne({
      from,
      to,
      message,
      createdAt: new Date(),
      updatedAt: new Date(),
      seen: isUserOnline?.openProfile === from,
    });
    io.sockets.emit(to, "update");
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get("/getonlineuser/:name", async (req, res) => {
  try {
    console.log("/getonlineuser/:name", connectedUsers);
    const name = req.params.name;
    res.send(connectedUsers.find((user) => user.name === name) ? true : false);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/openprofile", async (req, res) => {
  try {
    const { name, openProfile } = req.body;
    if (connectedUsers.length) {
      const isUserOnline = connectedUsers.find((user) => user.name === name);
      if (isUserOnline) isUserOnline.openProfile = openProfile;
      // console.log("/openprofile", connectedUsers);
      res.send(isUserOnline);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get("/chats/:name", async (req, res) => {
  try {
    if (req?.params?.name) {
      // console.log("/chats", req.params.name);
      const result = await chats
        .find({
          $or: [{ from: req.params.name }, { to: req.params.name }],
        })
        .toArray();
      res.send(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/seenall", async (req, res) => {
  try {
    const { from, to } = req.body;
    const filter = { seen: false, from, to };
    const updateDoc = {
      $set: { seen: true },
    };
    const result = await chats.updateMany(filter, updateDoc);
    io.sockets.emit(from, "update");
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
app.get("/logout/:name", async (req, res) => {
  await chats.deleteMany({});
  if (connectedUsers.length) {
    const name = req.params.name;
    const socketId = connectedUsers.find((user) => user.name === name);
    if (socketId) {
      const sockets = io.sockets.sockets.get(socketId.id);
      sockets.disconnect(true);
      connectedUsers = connectedUsers.filter((user) => user.name !== name);
    }
  }
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

app.post("/users", async (req, res) => {
  if (req.body.user) {
    const result = await users.find({ name: { $ne: req.body.user } }).toArray();
    if (result) res.status(200).send(result);
    else res.status(200).send("No user found");
  } else {
    res.status(500).send("user name required");
  }
});
app.post("/group", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const { name, users } = JSON.parse(req.body.userData);
    if (name && users.length) {
      const uploadStream = bucket.openUploadStream(file.originalname);
      // Pipe the file buffer to the GridFS upload stream
      const resp = await uploadStream.end(file.buffer);
      if (resp.filename) {
        const result = await groups.insertOne({
          name,
          users,
          imageId: String(resp.id),
          chat: [],
        });
        if (result) res.status(200).send("New group created");
        else res.status(500).send("Group not created");
      }
    } else {
      res.status(200).send("Provide group name, users");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
app.patch("/group", async (req, res) => {
  const { name, from, message, type, reply } = req.body;
  if (message) {
    const result = await groups.updateOne(
      { name },
      {
        $push: {
          chat: {
            _id: new ObjectId(),
            name,
            from,
            message,
            emoji: [],
            type,
            reply,
            createdAt: new Date(),
            updatedAt: new Date(),
            pin: false,
          },
        },
      }
    );
    if (result) res.status(200).send(result);
    else res.status(500).send("No user found");
  } else {
    res.status(500).send("user name required");
  }
});
app.get("/group/:name", async (req, res) => {
  const name = req.params.name;
  console.log(name);
  if (name) {
    const result = await groups.find({ users: name }).toArray();
    if (result) res.status(200).send(result);
    else res.status(500).send("No groups found");
  } else res.status(500).send("Provide group name, users");
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
                  reply: null,
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
                reply: null,
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
  const response4 = await groups.deleteMany({});
  res.send({ response1, response2, response3, response4 });
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
app.post("/vote", async (req, res) => {
  const { currentUser, selectedUser, chatId, answer, action } = req.body;
  if (currentUser && selectedUser && chatId && answer) {
    const query = {
      name: currentUser,
      "chat._id": new ObjectId(chatId),
      "chat.message.answers.answer": answer,
    };

    // Update command to add userData to the users array
    const updateDocument = {};
    if (action === "add")
      updateDocument["$push"] = {
        "chat.$.message.answers.$[answerObj].users": currentUser,
      };
    else
      updateDocument["$pull"] = {
        "chat.$.message.answers.$[answerObj].users": currentUser,
      };

    // ArrayFilters to identify the specific answer to update
    const options = {
      arrayFilters: [{ "answerObj.answer": answer }],
    };
    const result = await users.updateOne(query, updateDocument, options);

    const query1 = {
      name: selectedUser,
      "chat._id": new ObjectId(chatId),
      "chat.message.answers.answer": answer,
    };

    // Update command to add userData to the users array
    const updateDocument1 = {};
    if (action === "add")
      updateDocument1["$push"] = {
        "chat.$.message.answers.$[answerObj].users": currentUser,
      };
    else
      updateDocument1["$pull"] = {
        "chat.$.message.answers.$[answerObj].users": currentUser,
      };

    // ArrayFilters to identify the specific answer to update
    const options1 = {
      arrayFilters: [{ "answerObj.answer": answer }],
    };
    const result1 = await users.updateOne(query1, updateDocument1, options1);
    if (result && result1) res.status(200).send({ result, result1 });
    else res.status(500).send("Failed to pin message");
  } else {
    res.status(500).send("currentUser, selectedUser, chatId, answer required");
  }
});

// Start the main Express app
app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
