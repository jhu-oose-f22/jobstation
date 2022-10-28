import React from "react";
import { OnlineIcon } from "./icons";

const UserSidebar = ({ users }) => {

  const userLi = users ? users.map((user) => {
    return (
      <li className="btn btn-outline-dark rounded-0" key={user.id}>
        <div className="d-flex align-items-center text-white">
          <OnlineIcon />
          <span className="ms-1">{user.name}</span>
        </div>
      </li>
    );
  }) : null;


  return (
    <div className="bg-dark d-flex flex-column justify-content-between align-items-between h-100 col-2 bg-opacity-50 w-100">
      {users ? (
        <div className="h-100">

          <div className="my-2" style={
            {
              height: "90%",
              overflow: 'auto'
            }
          }>
            <ul className="list-group py-2 text-white">
              {userLi}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UserSidebar;
