const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
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

const dotenv = require("dotenv")
dotenv.config()
app.use(cors());
app.use(router);

connectDB();

io.on('connect', (socket) => {
  // console.log(socket);
  socket.on('join', async ({ name, room }, callback) => {
    console.log(name, room);
    // this should be add to the group database
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.join(user.room);
    // fetch chat history from db and pass to frontend to display
    //   response1.data.map((obj) => ({ text: obj.text, user: obj.user }))

    const msgs = await chatMessageController.fetchChatMessage(user.room);
    const history = msgs.map((obj) => ({ text: obj.content, user: obj.user }));
    console.log(history);
    socket.emit('history', history);
    // chatMessageController.createChatMessage(room,user.name);

    socket.emit('message', { user: 'NightBot', text: `${user.name}, welcome to room ${user.room}.` });
    socket.broadcast.to(user.room).emit('message', { user: 'NightBot', text: `${user.name} has joined!` });

    console.log(`${user.name} joined the room ${room}`)


    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', async (message, callback) => {
    const user = getUser(socket.id);

    console.log(user.room);
    io.to(user.room).emit('message', { user: user.name, text: message });

    chatMessageController.storeChatMessage(user.room, message, user.name);

    console.log(`a message: ${message} has been sent.`);

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  })
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  server.listen(process.env.PORT || 4000, () => console.log(`Server has started.`));
});
