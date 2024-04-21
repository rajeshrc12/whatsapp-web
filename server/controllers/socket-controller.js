let onlineUsers = [];
const handleSocket = (socket) => {
  console.clear();
  if (!onlineUsers.find((user) => user.email === socket.handshake.query.email))
    onlineUsers.push({
      email: socket.handshake.query.email,
    });
  console.log("Online Users", onlineUsers);
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter(
      (user) => user.email !== socket.handshake.query.email
    );
    console.log("Online Users", onlineUsers);
  });
};
const getOnlineUsers = (_, res) => res.send(onlineUsers);
module.exports = {
  handleSocket,
  getOnlineUsers,
};
