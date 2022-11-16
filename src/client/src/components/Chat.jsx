import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

import { isLoggedIn, UserContext } from "../context/User";

import UserSidebar from "./GroupChat/UserSidebar";
import InfoBar from "./GroupChat/InfoBar/InfoBar";

import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import SettingModal from "./GroupChat/SettingModal";
import GroupCalendar from "./GroupChat/GroupCalendar";
import LeftSidebar from "./GroupChat/LeftSidebar";
import ChatPage from "./GroupChat/ChatPage";

import "./GroupChat/Chat.css";
import axios from "axios";
import { API_URL } from "../context/Const";

const ENDPOINT = "localhost:4000";

const socket = io(ENDPOINT);

const Chat = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const name = user._id;
  const [group, setGroup] = useState(
    state.group
  );
  const [usersOnline, setUsersOnline] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);


  useEffect(() => {
    if (!state.group || !isLoggedIn(user) || state.group.members.indexOf(name) === -1) return;
    if (Object.keys(group).length === 0) return;
    socket.emit("join", { name: name, room: group._id }, (error) => {
      console.log(group.groupName)
      if (error) {
        console.log(error);
      }
    });

    socket.on('connect', (e) => { setIsConnected(true) });

    socket.on('disconnect', (e) => { setIsConnected(false) });

    socket.on("history", history => {
      messages.push(...history);
    })

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    }
  }, []);

  useEffect(() => {
    if (Object.keys(group).length === 0) return;

    socket.on("message", (message) => {
      messages.push(message);
    });

    socket.on("roomData", ({ users }) => {
      setUsersOnline(users);
    });
    return () => {
      socket.off("history");
      socket.off("message");
      socket.off("roomData");
    }
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message && isConnected) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const [userNames, setUserNames] = useState(new Map());
  useEffect(() => {
    if (!group) return;
    axios.get(API_URL + "/groupuser/" + group._id).then(
      (res) => {
        setUserNames(new Map(res.data.map((({ _id, username }) => [_id, username]))));
      },
      (err) => {
        console.log(err);
      }
    );
  }, [group, usersOnline]);

  if (!state || !state.group || state.group.members.indexOf(user._id) === -1 || !isLoggedIn(user)) {
    window.alert("You are not a member of this group");
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
        <div className="col-2 h-100 collapse" id="sidebarLeft">
          <LeftSidebar />
        </div>
        <div className="tab-content w-100 h-100"
          style={
            {
              position: "relative"
            }
          }
        >
          {/* Pages */}
          {/* 1. Chat */}
          <ChatPage states={
            {
              messages, message, setMessage, sendMessage, userNames
            }
          } />

          {/* 2. Calendar */}
          <GroupCalendar group={group} />


        </div>
        <div className="col-4 col-md-2 h-100 collapse show"
          id='sidebarUser'
        >
          <UserSidebar usersOnline={usersOnline} group={group} userNames={userNames} />
        </div>
      </div>

      <SettingModal group={group} setGroup={setGroup} />
    </div>
  );
};

export default Chat;
