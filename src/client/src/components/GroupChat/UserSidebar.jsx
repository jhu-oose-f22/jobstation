import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { API_URL } from "../../context/Const";
import { UserContext } from "../../context/User";

const UserSidebar = ({ usersOnline, group, userNames, socket }) => {

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const isOwner = group.owner === user._id;

  useEffect(() => {
    if (!group.members.find((member) => member === user._id)) {
      window.alert("You are not a member of this group!");
      navigate("/group");
    }
  }, [userNames, group.members]);


  const removeGroupMember = async (userId, userName) => {
    let res = window.confirm(`Are you sure you want to remove ${userName} from the group?`);
    if (!res) return;
    await fetch(`${API_URL}/group/quit`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        groupId: group._id,
        userId,
      }),
    }).then((res) => {
      window.alert(`${userName} has left the group`);
      socket.emit("refresh");
    });
  }

  const changeOwner = async (userId, userName) => {
    let res = window.confirm(`Are you sure you want to make ${userName} the new owner?`);
    if (!res) return;
    axios.patch(`${API_URL}/group/update/${group._id}`, { ...group, owner: userId }).then(
      (res) => {
        console.log("Finished changing owner");
        socket.emit("refresh");
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Here user.name is the id of the user (not the name)
  const userOnlineList = usersOnline ? usersOnline.map((user) => {
    let username = userNames.get(user.name);

    if (username)
      return (
        <li className="btn btn-dark rounded-0" key={user.name} value={user.name}
          title={`${username} is online`}>
          <div className="d-flex align-items-center"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            aria-haspopup="true"
            id={user.name}
          >
            <div className=" d-flex align-items-center">
              <img className="" width={30}
                title={`${username}`}
                src={(user.avatar !== '' && user.avatar) || `https://ui-avatars.com/api/?name=${username}&background=random&bold=true&rounded=true`} alt={`user ${username}`} />
              <i className="mask fa-solid fa-circle fa-sm " color='lightgreen'
                style={{
                  transform: 'translate(-75%, 75%)',
                }}
              ></i>
            </div>
            <span className={user.name === group.owner ? "text-danger" : ' text-white'}>
              {username + (user.name === group.owner ? " (Owner)" : "")}
            </span>
          </div>

          {isOwner ? (user.name !== group.owner ?
            <div className="dropdown-menu" aria-labelledby={user.name}>
              <span className="dropdown-item text-danger"
                onClick={(e) => {
                  e.preventDefault();
                  removeGroupMember(user.name, username);
                }
                }
              >Remove User</span>
              <span className="dropdown-item text-primary"
                onClick={(e) => {
                  e.preventDefault();
                  changeOwner(user.name, username);
                }
                }
              >Change Owner</span>
            </div> : null)
            : null
          }
        </li>
      );
    else return null;
  }) : null;

  // Here username is the username
  const userOfflineList = group.members.filter((userId) => { return !(usersOnline && usersOnline.find((u) => u && u.name === userId)) }).map((userId) => {
    let username = userNames.get(userId);
    if (username)
      return <li className="btn btn-dark rounded-0" key={userId} value={userId}
        title={`${username} is offline`}
        onClick={isOwner && userId !== group.owner ? (e) => {
          e.preventDefault();
          removeGroupMember(userId, username);
        } : null}
      >
        <div className="d-flex align-items-center text-secondary" >
          <div className="h-100 d-flex align-items-center">
            <img className="" width={30}
              title={`${username}`}
              src={`https://ui-avatars.com/api/?name=${username}&background=random&bold=true&rounded=true`} alt={`user ${username}`} />
            <i className="mask fa-solid fa-circle fa-sm " color='gray'

              style={{
                transform: 'translate(-75%, 75%)',
              }}
            ></i>
          </div>

          <span className={userId === group.owner ? "text-danger" : ' text-secondary'}>{username + (userId === group.owner ? "(Owner)" : "")}</span>
        </div>
      </li>
    else return null;

  });

  return (
    <div className="bg-dark d-flex flex-column justify-content-between align-items-between h-100 col-2 w-100">
      {usersOnline ? (
        <div className="my-2" style={
          {
            height: "50%",
            overflow: 'auto '
          }
        }>
          <small className="text-secondary my-0 mx-2">ONLINE - {userOnlineList.length}</small>
          <ul className="list-group py-2 text-white">
            {userOnlineList}
          </ul>
        </div>
      ) : null}
      <small className="text-secondary my-0 mx-2">OFFLINE - {userOfflineList.length}</small>
      <ul className="list-group py-2 text-white h-100 overflow-auto">
        {userOfflineList}
      </ul>
    </div>
  );
}

export default UserSidebar;
