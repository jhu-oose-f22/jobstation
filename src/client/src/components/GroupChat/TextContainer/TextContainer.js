import React from "react";
import { OnlineIcon } from "../icons";

import onlineIcon from "../icons/onlineIcon.png";

import "./TextContainer.css";
// import "../Chat/Chat.css";
// :hover {}
const TextContainer = ({ users }) => {
  if (!users || users.length === 0) {
    users = [
      { name: 'bot' },
      { name: 'lskdfj' },
    ]
    users = users.concat(users);
    users = users.concat(users);
    users = users.concat(users);
    users = users.concat(users);

  }
  return (
    <div className="bg-secondary h-100 col-2 bg-opacity-50  border border-light border-opacity-50 " style={
      {
        borderRadius: '0 18px 18px 0',
      }
    }>
      {users ? (
        <div className="h-100">
          <div className="text-white d-flex flex-row justify-content-center align-items-center bg-primary bg-opacity-25 text-dark py-3 px-1 border border-light border-opacity-50">
            Members
          </div>
          <div className="" style={
            {
              height: "100%",
              overflow: 'auto'
            }
          }>
            <ul className="list-group p-2 text-white">
              {users.map(({ name }) => (
                <div key={name} className="my-1">
                  <OnlineIcon />
                  <span className="ms-1">{name}</span>
                </div>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
      {/* </div> */}
    </div>
  );
}

export default TextContainer;
