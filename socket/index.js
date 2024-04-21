const { Server } = require("socket.io");

const io = new Server(3002, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.clear();
  console.log("user connected", socket.handshake.query.email);
});
