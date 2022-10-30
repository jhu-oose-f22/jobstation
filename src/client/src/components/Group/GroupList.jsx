import { useContext, useState } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import { UserContext } from "../../context/User";
import GroupCard from "./GroupCard";

export default function GroupList({ listName, groups = null }) {
  const { user } = useContext(UserContext);
  const [newGroupName, setNewGroupName] = useState({});
  const [newGroupIntro, setNewGroupIntro] = useState({});

  let groupTitle;
  // TODO throttle all groups
  if (!groups) groups = [];
  else {
    groups = groups.map((group) => {
      if (group.members.includes(user.username)) {
        return (
          <li className=" list-group-item border-0 " key={group._id}>
              <GroupCard group={group} />
          </li>
        );
      }
    });
  }
  switch (listName) {
    case "recommended":
      groupTitle = "Recommended for You";
      break;
    case "join":
      groupTitle = "Your Groups";
      break;
    case "related":
      groupTitle = "Search Results";
      break;
    case "all":
      groupTitle = "All Groups";
      break;
    default:
      return <Navigate to="/" />;
  }
  const handleCreate = async (e) => {
    console.log(`before add: ${user.username}`);
    const newGroup = {
      groupName: newGroupName,
      groupIntro: newGroupIntro,
      owner: user.username,
    };

    await fetch("/group/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newGroup),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    window.history.go(0);
  };

  return (
    <div className="accordion-item py-5 border-0">
      <div className=" accordion-header my-2" id={listName}>
        <button
          className="accordion-button  rounded-3 shadow-sm bg-light "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${listName}body`}
          aria-controls={`${listName}body`}
          aria-expanded="true"
          aria-label="Toggle"
        >
          <h3 className="ms-3 text-dark">{groupTitle}</h3>
        </button>
      </div>
      <div
        className="collapse accordion-collapse show list-group"
        id={`${listName}body`}
      >
        <ul className=" d-flex overflow-auto flex-wrap">
          {groups}
          <li className=" list-group-item border-0 d-flex align-items-center justify-content-center">
            <div
              className="card d-flex flex-row p-0 align-content-between justify-content-center shadow-lg"
              style={{
                width: 270,
                height: 200,
              }}
            >
              <button
                className="btn btn-outline-light w-100 text-center"
                type="button"
              >
                <i className="fa-solid fa-ellipsis fa-5x text-dark text-opacity-25"></i>
              </button>
              <button
                className="btn btn-outline-light w-100"
                data-bs-toggle="modal"
                type="button"
                data-bs-target={`#addGroupModal${listName}`}
              >
                <i className="fa-solid fa-plus fa-5x text-dark text-opacity-25"></i>
              </button>
            </div>
          </li>
        </ul>
        {/* {groupTitle === "Your Groups"? */}
        <div
          className="modal fade"
          id={`addGroupModal${listName}`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby={`addGroupModal${listName}Label`}
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id={`addGroupModal${listName}Label`}
                >
                  Create group
                </h5>
                <button
                  type="button"
                  className="btn btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group">
                    <label for="groupName">Name</label>
                    <input
                      className="form-control"
                      id="groupName"
                      placeholder="..."
                      onChange={(e) => setNewGroupName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label for="groupIntro">Description</label>
                    <input
                      className="form-control"
                      id="groupIntro"
                      placeholder="..."
                      onChange={(e) => setNewGroupIntro(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    X
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => handleCreate()}
                  >
                    ✔️
                  </button>
                </form>
              </div>

              <div className="modal-footer">
                {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">X</button>
                            <button type="button" className="btn btn-success" onClick={() => handleCreate()}>✔️</button> */}
              </div>
            </div>
            {/* : ;} */}
          </div>
        </div>
      </div>
    </div>
  );
}
