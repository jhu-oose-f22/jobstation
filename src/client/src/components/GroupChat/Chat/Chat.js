import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
// import axios from "axios";

// import api from "../api/posts";
import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar";
import Input from "../Input/Input";

import { useLocation, useNavigate } from "react-router-dom";

const ENDPOINT = "localhost:4000";


const Chat = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState(state.name);
  const [room, setRoom] = useState(state.room);
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(io(ENDPOINT));
  useEffect(() => {
    if (!state?.room || !state?.name) navigate('../');
    setRoom(state.room);
    setName(state.name);
    socket.on('connect', (e) => { console.log(e) });
    socket.emit("join", { name, room }, (error) => {
      console.log('emit');
      if (error) {
        console.log(error);
      }
    });
  }, [state, name, room, socket, setRoom, setName, navigate]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    socket.on("history", history => {
      setMessages(history);
    })

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [socket, messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="container-lg d-flex align-items-center justify-content-center p-3"
      style={{
        backgroundSize: 'cover',
        height: 800
      }}
    >
      <div className="col-8 d-flex flex-column align-items-between justify-content-center h-100 ">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          room = {room}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
