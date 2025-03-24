const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  }
});

let players = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-table", (player) => {
    players.push(player);
    io.emit("update-players", players);
  });

  socket.on("chat-message", (msg) => {
    io.emit("chat-message", msg);
  });

  socket.on("start-game", () => {
    const hand = ["🂡", "🂱"];
    io.to(socket.id).emit("deal-cards", { cards: hand });
    io.emit("community-cards", ["🃑", "🃂", "🂾"]);
    io.emit("pot-update", Math.floor(Math.random() * 1000));
    io.emit("turn-update", players[0]?.id);
  });

  socket.on("player-action", ({ id, action }) => {
    console.log(`Action from ${id}: ${action}`);
  });

  socket.on("disconnect", () => {
    players = players.filter(p => p.id !== socket.id);
    io.emit("update-players", players);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
