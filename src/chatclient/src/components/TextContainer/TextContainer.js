import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";

import "./TextContainer.css";
// import "../Chat/Chat.css";
 // :hover {}
const TextContainer = ({ users }) => (
  <div className="userContainer">
    {users ? (
      <div>
        <div className="membersBar">
          <h2>Members Online</h2>
        </div>
        <div className="activeContainer">
          
          <ul className="userList">
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                <img alt="Online Icon" src={onlineIcon} />
                {name}
              </div>
            ))}
          </ul>
        </div>
      </div>
    ) : null}
    {/* </div> */}
  </div>
);

export default TextContainer;
