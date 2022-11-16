import axios from "axios";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
// import { API_URL } from "../context/Const";
import { isLoggedIn, UserContext } from "../context/User";
import GroupList from "./Group/GroupList";
import Banner from "./Utils/Banner";
import SearchGroup from "./Group/GroupSearch";
// const axios = require('axios')
export default function SearchResult() {

    const location = useLocation();
    const result = location.state.groups;
    console.log("result page")
    console.log(result);

  const { user } = useContext(UserContext);
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
        <GroupList listName="related" groups={result} search={true} />
        {/* <GroupList listName="recommended" /> */}
      </div>
    </div>
  );
}
