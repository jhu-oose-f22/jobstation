import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

import { isLoggedIn, UserContext } from "../context/User";

import UserSidebar from "./GroupChat/UserSidebar";
import Messages from "./GroupChat/Messages/Messages";
import InfoBar from "./GroupChat/InfoBar";
import Input from "./GroupChat/Input/Input";

import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";

const ENDPOINT = "localhost:4000";


const Chat = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const name = user.username;
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(io(ENDPOINT));
  useEffect(() => {
    if (!state.room) navigate('../');
    setRoom(state.room);
    if (room === '') return;
    console.log(name, room);
    socket.on('connect', (e) => { console.log(e) });
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }, [state, name, room, socket, setRoom, navigate]);

  useEffect(() => {
    if (room === '') return;
    socket.on("history", history => {
      setMessages(history);
    })
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
    console.log(messages);
  }, [messages, socket, room]);

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
    <div className="h-100 d-flex flex-column bg-img m-0 w-100"
      style={{
        backgroundImage: `url(https://source.unsplash.com/random/?${room.slice(0, room.indexOf(' ') + 1)})`,
        backgroundSize: 'cover',
      }}
    >
      <InfoBar room={room} />
      <div className="d-flex overflow-auto">
        <div className="w-100 d-flex flex-column align-items-between justify-content-center h-100 ">
          <Messages messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
        <div className="col-md-2 h-100 collapse show"
          id='sidebar'
        >
          <UserSidebar users={users} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
