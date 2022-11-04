import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import Profile from "./Dashboard/Profile";
import MyPosts from "./Dashboard/MyPosts";
import { isLoggedIn, UserContext } from "../context/User";
import Banner from "./Utils/Banner";

export default function Dashboard(props) {
    const {user} = useContext(UserContext);
    const [userProfile, setUserProfile] = useState({});
    const [postsOfCurrentUser, setPostsOfCurrentUser] = useState([]);
    useEffect(() => {
        if (!isLoggedIn(user)) return;
        fetch(`/profile/${user.username}`)
            .then((res) => res.json())
            .then((profile) => {
                setUserProfile(profile);
            })
        fetch(`posts/${user.username}`)
            .then((res)=> res.json())
            .then((posts) => {
                setPostsOfCurrentUser(posts);
            })
        
    }, [])
    if (!isLoggedIn(user)) {
        return <Navigate to="/login" />;
    }


    return (
        <div>
            <Profile profile={userProfile} />
            <MyPosts posts={postsOfCurrentUser} />
        </div>
    )

}

