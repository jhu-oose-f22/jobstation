import axios from "axios";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../context/Const";
import { isLoggedIn, UserContext } from "../context/User";
import GroupList from "./Group/GroupList";
import Banner from "./Utils/Banner";

export default function Group(props) {
    const { user } = useContext(UserContext);
    const { groups, setGroups } = useState([]);

    if (!isLoggedIn(user)) {
        return <Navigate to='/login' />;
    }


    // Get all groups
    axios.get(API_URL + '/discussion').then(
        res => {
            console.log(res);
        },
        err => {
            console.log(err);
        }

    )


    return <div className="min-vh-100">
        <Banner pageName='group' />
        <div className="accordion">
            <GroupList listName='join' groups={groups} />
            <GroupList listName='recommended' />
            <GroupList listName='all' />
        </div>

    </div>

}