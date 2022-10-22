import React from "react";
import { OnlineIcon } from "./icons";

const Sidebar = ({ users }) => {
  
  return (
    <div className="bg-secondary d-flex flex-column justify-content-between align-items-between h-100 col-2 bg-opacity-50  border border-light border-opacity-50 w-100" style={
      {
        borderRadius: '0 18px 18px 0',
      }
    }>
      {users ? (
        <div className="h-100">
          <div className="text-white text-wrap text-center  bg-primary bg-opacity-25 py-3 px-1"
            style={
              {
                borderRadius: '0 18px 0 0',
              }
            }
          >
            <h3>Members</h3>
          </div>
          <div className="my-2" style={
            {
              height: "90%",
              overflow: 'auto'
            }
          }>
            <ul className="list-group p-2 text-white">
              {users.map(({ name }, idx) => (
                <div key={idx} className="my-1">
                  <OnlineIcon />
                  <span className="ms-1">{name}</span>
                </div>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Sidebar;
