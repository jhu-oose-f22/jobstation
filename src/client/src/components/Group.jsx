import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn, UserContext } from "../context/User";
import GroupList from "./Group/GroupList";
import Banner from "./Utils/Banner";

export default function Group(props) {
    const { user } = useContext(UserContext);

    if (!isLoggedIn(user)) {
        return <Navigate to='/login' />;
    }


    return <div className="">
        <Banner pageName='group' />
        <div className="accordion">
            <GroupList listName='recommended' />
            <GroupList listName='join' />
            <GroupList listName='all' />
        </div>
        
    </div>

}