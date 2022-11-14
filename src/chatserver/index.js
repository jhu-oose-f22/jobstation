const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv")

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');
const connectDB = require('./config/dbConn');
const chatMessageController = require('./controller/chatMessageController')

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server,
  {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

dotenv.config()
app.use(cors());
app.use(router);

connectDB();


const allClients = [];
io.on('connect', (socket) => {
  allClients.push(socket);
  console.log(allClients.length)

  socket.on('join', async ({ name, room }, callback) => {
    console.log(name, room);
    // this should be added to the group database
    // console.log(name, room);
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);
    socket.join(user.room);
    // fetch chat history from db and pass to frontend to display
    const msgs = await chatMessageController.fetchChatMessage(user.room);
    console.log('fetched from db')
    const history = msgs.map((obj) => ({ text: obj.content, user: obj.user }));
    // console.log(history);
    console.log('history mapped');
    socket.emit('history', history);
    // chatMessageController.createChatMessage(room,user.name);

    // socket.emit('message', { user: 'NightBot', text: `${user.name}, welcome to room ${user.room}.` });
    // socket.broadcast.to(user.room).emit('message', { user: 'NightBot', text: `${user.name} has joined!` });

    // console.log(`${user.name} joined the room ${room}`)


    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    callback();

  });

  socket.on('sendMessage', async (message, callback) => {
    const user = getUser(socket.id);

    // console.log(user.room);
    console.log('sending------------')
    if (user.room) {
      io.to(user.room).emit('message', { user: user.name, text: message });

      await chatMessageController.storeChatMessage(user.room, message, user.name);
    }

    // console.log(`a message: ${message} has been sent.`);

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }

    const i = allClients.indexOf(socket);
    allClients.splice(i, 1);
  })
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  server.listen(process.env.PORT || 4000, () => console.log(`Server has started.`));
});
