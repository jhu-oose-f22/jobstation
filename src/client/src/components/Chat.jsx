import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
// import axios from "axios";

// import api from "../api/posts";
import Sidebar from "./GroupChat/Sidebar";
import Messages from "./GroupChat/Messages/Messages";
import InfoBar from "./GroupChat/InfoBar";
import Input from "./GroupChat/Input/Input";

import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ENDPOINT = "localhost:4000";


const Chat = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(io(ENDPOINT));
  useEffect(() => {
    if (!state.room || !state.name) navigate('../');
    setRoom(state.room);
    setName(state.name);
    socket.on('connect', (e) => { console.log(e) });
    socket.emit("join", { name, room }, (error) => {
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
  }, [messages, socket]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  if (!state) {
    return <Navigate to='../' />
  }


  return (
    <div className="h-100 d-flex bg-img m-0 w-100"
      style={{
        backgroundImage: `url(https://source.unsplash.com/random/?${room.slice(0, room.indexOf(' ') + 1)})`,
        backgroundSize: 'cover',
      }}
    >
      <div className="col-md-2 h-100 collapse show"
        id='sidebar'
      >
        <Sidebar users={users} />
      </div>
      <div className="w-100 d-flex flex-column align-items-between justify-content-center h-100 ">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>

    </div>
  );
};

export default Chat;
