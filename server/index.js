const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { log } = require("console");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join", (data) => {
    const roomsData = JSON.parse(fs.readFileSync("./rooms.json"));
  
    const openRooms = roomsData.rooms.filter(room => room.isOpen);
  
    const roomWithOneParticipant = openRooms.find(room => room.participants.length === 1);
  
    if (roomWithOneParticipant) {
      roomWithOneParticipant.participants.push(data);
      roomWithOneParticipant.isOpen = false;
    } else {
      const newRoomId = uuidv4();
      const participants = [data];
  
      const newRoom = {
        RoomId: newRoomId,
        participants: participants,
        isOpen: true,
      };
  
      roomsData.rooms.push(newRoom);
    }
  

    fs.writeFileSync("./rooms.json", JSON.stringify(roomsData));
  
  roomsData.rooms.forEach((room) => {
    if (room.participants.length === 2) {
      io.emit("roomsData", roomsData);
    }
  });

  });
  
  socket.on("deleteRoom", (roomId) => {
    console.log(roomId);
    const roomsData = JSON.parse(fs.readFileSync("./rooms.json"));

    const roomIndex = roomsData.rooms.findIndex(
      (room) => room.RoomId === roomId
    );

    if (roomIndex !== -1) {
      roomsData.rooms.splice(roomIndex, 1);
      fs.writeFileSync("./rooms.json", JSON.stringify(roomsData));
      io.emit("roomsData", roomsData);
      console.log(`Room ${roomId} deleted`);
    }
  });

  socket.on("skipped", (data) => {
    const a = fs.readFileSync("./rooms.json", "utf-8");
    const userData = JSON.parse(a);
    const participants = userData.rooms[0].participants;
    const users = [];
    participants.forEach((participant) => {
      const userName = Object.values(participant)[0].userName;
      users.push(userName);
    });
    console.log(users);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
