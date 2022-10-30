import axios from "axios";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
// import { API_URL } from "../context/Const";
import { isLoggedIn, UserContext } from "../context/User";
import GroupList from "./Group/GroupList";
import Banner from "./Utils/Banner";
import SearchGroup from "./SearchGroup";
// const axios = require('axios')
export default function SearchResult() {

    const location = useLocation();
    // console.log(location.state.groups) 
    const result = location.state.groups;

//   console.log("search result");
//   console.log(groups);

//   console.log(this.props.location.state.fetched_groups);
  const { user } = useContext(UserContext);
  //   const [groups, setGroups] = useState(fetched_groups);
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
        <SearchGroup groups={[]}/>
        <GroupList listName="related" groups={result} />
        <GroupList listName="recommended" />
      </div>
    </div>
  );
}
