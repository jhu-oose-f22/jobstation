// import axios from "axios";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
// import { API_URL } from "../context/Const";
import { isLoggedIn, UserContext } from "../context/User";
import GroupList from "./Group/GroupList";
import Banner from "./Utils/Banner";
import SearchGroup from "./Group/GroupSearch";
// const axios = require('axios')
export default function Group(props) {
    const { user } = useContext(UserContext);
    // console.log("user from context");
    // console.log(user);
    const [groups, setGroups] = useState([]);
    const [recommendedGroups, setRecommmendedGroups] = useState([]);
    useEffect(() => {
        if (!isLoggedIn(user)) return;
        fetch(`/group/${user.username}`)
            .then((res) => res.json())
            .then((fetched) => {
                setGroups(fetched);
            });
        // fetch('/group/user/zpu2')
        fetch(`/group/user/${user.username}`)
            .then((res) => res.json())
            .then((recommended) => {
              // console.log("recommended in group")
              // console.log(recommended)
              setRecommmendedGroups(recommended);
            })
    }, []);
    if (!isLoggedIn(user)) {
        return <Navigate to="/login" />;
    }
    // console.log("recccc");
    // console.log(recommendedGroups);
    return (
        <div
            className=" h-100"
            style={{
                overflowY: "auto",
            }}
        >
            <Banner pageName="group" />
            <div className="accordion">
                <SearchGroup groups={groups} />
                <GroupList listName="join" groups={groups} />
                <GroupList listName="recommended" groups={recommendedGroups}/>
            </div>
        </div>
    );
}
