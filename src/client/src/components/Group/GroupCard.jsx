import { Link } from "react-router-dom";
import { UserContext } from "../../context/User";
import { useContext, useState } from "react";

export default function GroupCard({ group }) {
  /**
     * group: {
                groupId: '23',
                groupname: 'Meta OA 10.1',
                groupMemberCount: 50,
                groupAvatar: null,
                groupIntro: 'This is a group for practicing Meta OA on Oct.1'
            }
     * 
     */

  // TODO Modal
  const { user } = useContext(UserContext);
  const handleQuit = async (e) => {
    const group_n_user = {groupId: group._id, username: user.username};
    await fetch("/group/quit", {
        method: "post",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(group_n_user)
    }).then((res) => res.json());

    window.history.go(0);
  }
  return (
    <div
      className="card btn shadow-sm d-flex flex-row p-0"
      style={{
        width: 270,
        height: 200,
        WebkitTransition: "all 250ms cubic-bezier(0.02, 0.01, 0.47, 1)",
        transition: "all 250ms cubic-bezier(.02, .01, .47, 1)",
      }}
    >
      <div className=" mask d-flex flex-row g-0  p-0 h-100 ">
        <div
          className=" col-4 p-1 text-dark h-100 "
          style={{
            backgroundColor: "rgba(69,69,69, 0.1)",
          }}
        >
          <Link
            className="text-decoration-none "
            to="./chat"
            state={{
              name: user.username,
              room: group.groupName,
            }}
          >
            <div className=" d-flex flex-column align-items-center justify-content-center h-100 m-2">
              <img
                src={
                  (group.avatar !== "" && group.avatar) ||
                  `https://ui-avatars.com/api/?name=${group.groupName}&background=random&bold=true`
                }
                className="img-fluid rounded-3 mb-3"
                alt={group.groupName}
              />
              <strong className="card-title">{group.groupName}</strong>
            </div>
          </Link>
        </div>

        <div className=" col-8 text-start flex-column    justify-md-content-center d-flex h-100">
          {/* <img className="" src={
                    `https://source.unsplash.com/random/170x130/?${group.groupname}`
                } alt='' /> */}
          <div
            className=" d-flex flex-column mt-md-auto mt-0 p-2"
            style={{
              overflow: "auto",
            }}
          >
            <p className="card-text ">{group.groupIntro}</p>
          </div>

          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => handleQuit(e)}
          >
            quit
          </button>
          <button type="button" className="btn btn-primary">
            edit
          </button>
          <span className="p-2 mt-auto w-100">
            <nobr className="text-muted">last: 3 mins ago</nobr>
          </span>
        </div>
      </div>
    </div>
  );
}
