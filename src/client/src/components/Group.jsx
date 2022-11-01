import axios from "axios";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
// import { API_URL } from "../context/Const";
import { isLoggedIn, UserContext } from "../context/User";
import GroupList from "./Group/GroupList";
import Banner from "./Utils/Banner";
import SearchGroup from "./Group/GroupSearch"
// const axios = require('axios')
export default function Group(props) {
  const { user } = useContext(UserContext);
  const [groups, setGroups] = useState([]);
  useEffect(() => {

    fetch(`/group/${user.username}`)
      .then((res) => res.json())
      .then((fetched) => {
        setGroups(fetched);
        });
    //   });
  }, []);
  if (!isLoggedIn(user)) {
    return <Navigate to="/login" />;
  }

  return (
    <div
      className=" h-100"
      style={{
        overflowY: "auto", 
      }}
    >
      <Banner pageName="group" />
      <div className="accordion">
        <SearchGroup groups = {groups} />
        <GroupList listName="join" groups={groups} />
        <GroupList listName="recommended" />
      </div>
    </div>
  );
}
