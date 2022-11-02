import React from "react";

const UserSidebar = ({ users }) => {

  const userLi = users ? users.map((user) => {
    return (
      <li className="btn btn-dark rounded-0" key={user.id}
        title={`${user.name} is online`}
      >
        <div className="d-flex align-items-center text-white" >
          <div>
            <img className="" width={30}
              title={`${user.name}`}
              src={(user.avatar !== '' && user.avatar) || `https://ui-avatars.com/api/?name=${user.name}&background=random&bold=true&rounded=true`} alt={`user ${user.name}`} />
            <i className="mask fa-solid fa-circle fa-sm " color='lightgreen'
              style={{
                transform: 'translate(-75%, 75%)',
              }}
            ></i>
          </div>
          <span className="">{user.name}</span>
        </div>
      </li>
    );
  }) : null;


  return (
    <div className="bg-dark d-flex flex-column justify-content-between align-items-between h-100 col-2 w-100">
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
