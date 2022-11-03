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
<<<<<<< HEAD

=======
    if (!isLoggedIn(user)) return;
>>>>>>> 0e8f77957ac039a052a3e34550de8824ede01b5f
    fetch(`/group/${user.username}`)
      .then((res) => res.json())
      .then((fetched) => {
        setGroups(fetched);
<<<<<<< HEAD
        });
=======
      });
>>>>>>> 0e8f77957ac039a052a3e34550de8824ede01b5f
    //   });
  }, []);
  if (!isLoggedIn(user)) {
    return <Navigate to="/login" />;
  }

  return (
    <div
      className=" h-100"
      style={{
<<<<<<< HEAD
        overflowY: "auto", 
=======
        overflowY: "auto",
>>>>>>> 0e8f77957ac039a052a3e34550de8824ede01b5f
      }}
    >
      <Banner pageName="group" />
      <div className="accordion">
<<<<<<< HEAD
        <SearchGroup groups = {groups} />
=======
        <SearchGroup groups={groups} />
>>>>>>> 0e8f77957ac039a052a3e34550de8824ede01b5f
        <GroupList listName="join" groups={groups} />
        <GroupList listName="recommended" />
      </div>
    </div>
  );
}
