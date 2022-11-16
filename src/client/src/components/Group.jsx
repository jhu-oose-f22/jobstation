import { useEffect } from "react";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn, UserContext } from "../context/User";
import GroupList from "./Group/GroupList";
import Banner from "./Utils/Banner";
import SearchGroup from "./Group/GroupSearch";
import {API_URL} from "../context/Const";
export default function Group(props) {
    const { user } = useContext(UserContext);

    const [groups, setGroups] = useState([]);
    const [recommendedGroups, setRecommmendedGroups] = useState([]);
    useEffect(() => {
        if (!isLoggedIn(user)) return;
        fetch(`${API_URL}/group/${user._id}`)
            .then((res) => res.json())
            .then((fetched) => {
                setGroups(fetched);
            });
        
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
                <SearchGroup groups={groups} />
                <GroupList listName="join" groups={groups} />
                {/* <GroupList listName="recommended" groups={recommendedGroups}/> */}
            </div>
        </div>
    );
}
