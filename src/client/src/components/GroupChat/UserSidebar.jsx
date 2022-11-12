import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../../context/Const";
import { UserContext } from "../../context/User";

const UserSidebar = ({ usersOnline, group }) => {

  const { user } = useContext(UserContext);

  const isOwner = group.owner === user._id;

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
  }, [group]);


  const toggleGroupMember = (e) => {
    console.log(e.target.innerText);
    e.preventDefault();
    let res = window.confirm(`Are you sure you want to remove ${e.target.innerText} from the group?`);
    if (!res) return;
    console.log(e.target.innerText)
    axios.post(API_URL + '/group/quit',
      {
        groupId: group._id,
        username: e.target.innerText,
      }).then(() => {
        window.alert(`${e.target.innerText} have left the group`);
      }, (err) => {
        window.alert('Something went wrong');
        console.log(err);
      }
      )
  }

  // Here user.name is the id of the user (not the name)
  const userOnlineList = usersOnline ? usersOnline.map((user) => {
    let username = userNames.get(user.name);
    return (
      <li className="btn btn-dark rounded-0" key={user.id} value={user.name}
        title={`${username} is online`}
        onClick={isOwner && user.name !== group.owner ? toggleGroupMember : null}
      >
        <div className="d-flex align-items-center">
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
          <span className={user.name === group.owner ? "text-danger" : ' text-white'}>{username + (user.name === group.owner ? " (Owner)" : "")}</span>
        </div>
      </li>
    );
  }) : null;

  // Here username is the username
  const userOfflineList = group.members.filter((userId) => { return !(usersOnline && usersOnline.find((u) => u && u.name === userId)) }).map((userId) => {
    let username = userNames.get(userId);
    return <li className="btn btn-dark rounded-0" key={username} value={username}
      title={`${username} is offline`}
      onClick={isOwner && userId !== group.owner ? toggleGroupMember : null}
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
