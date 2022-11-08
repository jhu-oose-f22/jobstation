import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

import { isLoggedIn, UserContext } from "../context/User";

import UserSidebar from "./GroupChat/UserSidebar";
import Messages from "./GroupChat/Messages/Messages";
import InfoBar from "./GroupChat/InfoBar/InfoBar";
import Input from "./GroupChat/Input/Input";

import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import SettingModal from "./GroupChat/InfoBar/SettingModal";

const ENDPOINT = "localhost:4000";

const socket = io(ENDPOINT);

const Chat = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const name = user.username;
  const [group, setGroup] = useState(
    state.group || {}
  );
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);


  useEffect(() => {
    if (!state.group || !isLoggedIn(user)) navigate('../');
    setGroup(state.group);
    if (Object.keys(group).length === 0) return;
    socket.emit("join", { name: name, room: group.groupName }, (error) => {
      console.log(group.groupName)
      if (error) {
        console.log(error);
      }
    });

    socket.on('connect', (e) => { setIsConnected(true) });

    socket.on('disconnect', (e) => { setIsConnected(false) });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    }
  }, []);

  useEffect(() => {
    if (Object.keys(group).length === 0) return;
    socket.on("history", history => {
      setMessages(history);
    })
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
    return () => {
      socket.off("history");
      socket.off("message");
      socket.off("roomData")
    }
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message && isConnected) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  if (!state) {
    return <Navigate to='../' />
  }


  return (
    <div className="h-100 d-flex flex-column bg-img m-0 w-100"
      style={{
        backgroundImage: `url(https://source.unsplash.com/random/?${group.groupName.slice(0, group.groupName.indexOf(' ') + 1)})`,
        backgroundSize: 'cover',
      }}
    >
      <InfoBar group={group} />
      <div className="d-flex"
        style={
          {
            height: "93%",
          }
        }
      >
        <div className="w-100 d-flex flex-column align-items-between justify-content-center h-100 ">
          <Messages messages={messages} />
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

      <SettingModal group={group} />
    </div>
  );
};

export default Chat;
