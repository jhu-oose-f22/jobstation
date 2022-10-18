import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn, UserContext } from "../context/User";
import Banner from "./Banner";

export default function Group(props) {
    const { user } = useContext(UserContext);

    if (!isLoggedIn(user)) {
        return <Navigate to='/login' />;
    }

    const groupsResponds = [
        {
            groupId: '23',
            groupname: 'Meta OA',
            groupMember: '213123',
            groupAvatar: ''
        }
    ]

    return <div className="vh-100">
        <Banner pageName='group' />

    </div>

}