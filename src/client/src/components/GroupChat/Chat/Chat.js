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
    // if (!state?.room || !state?.name) navigate('../');
    
    socket.emit("join", { name, room }, (error) => {
      console.log('emit');
      if (error) {
        alert(error);
      }
    });
    // setJoined(true);
  // }, [state, name, room, socket, setRoom, setName, navigate]);
  }, [room]);
  useEffect(() => {
    
    socket.on("message", (message) => {
      setMessages(messages => [...messages, message]);
      
    });
    
  }, []);

  useEffect(() => {
    socket.on("history", history => {
      setMessages(history);
    })
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);
// }, [message, socket]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center p-5 bg-img "
      style={{
        backgroundImage: `url(https://source.unsplash.com/random/?${room})`,
        backgroundSize: 'cover',
      }}
    >
      <div className="col-8 d-flex flex-column align-items-between justify-content-center h-100 ">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
