import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

import { isLoggedIn, UserContext } from "../context/User";

import UserSidebar from "./GroupChat/UserSidebar";
import Messages from "./GroupChat/Messages/Messages";
import InfoBar from "./GroupChat/InfoBar/InfoBar";
import Input from "./GroupChat/Input/Input";

import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";

const ENDPOINT = "localhost:4000";


const Chat = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const name = user.username;
  const [group, setGroup] = useState(
    {
      groupName: "",
    }
  );
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket,] = useState(io(ENDPOINT));
  useEffect(() => {
    if (!state.group) navigate('../');
    setGroup(state.group);
    if (!group || Object.keys(group).length === 0) return;
    console.log(name, group);
    socket.on('connect', (e) => { console.log(e) });
    socket.emit("join", { name, room: group.groupName }, (error) => {
      if (error) {
        console.log(error);
      }
    });


    return () => {
      console.log("disconnect");
      socket.disconnect();
      socket.off();
    }

  }, [state, name, group, socket, setGroup, navigate]);

  useEffect(() => {
    if (group === '') return;
    socket.on("history", history => {
      setMessages(history);
    })
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages, socket, group]);

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
