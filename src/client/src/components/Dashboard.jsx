import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import Profile from "./Dashboard/Profile";
import MyPosts from "./Dashboard/MyPosts";
import { isLoggedIn, UserContext } from "../context/User";
import Banner from "./Utils/Banner";
import { TagSelection } from "./Utils/Tag";

export default function Dashboard(props) {
    const {user, toggleUser} = useContext(UserContext);
    //console.log(`user id at dashboard == ${user._id}`)
    console.log(`dashboard: user.username = ${user.username}`);
    const [userProfile, setUserProfile] = useState({});
    const [postsOfCurrentUser, setPostsOfCurrentUser] = useState([]);
    useEffect(() => {
        if (!isLoggedIn(user)) return;
        fetch(`/profile/${user._id}`)
            .then((res) => res.json())
            .then((profile) => {
                setUserProfile(profile);
                // setTag(profile.tags);
                // //console.log(profile);
            })
        fetch(`/posts/${user._id}`)
            .then((res)=> res.json())
            .then((posts) => {
                setPostsOfCurrentUser(posts);
            })
        
    }, [user])

    if (!isLoggedIn(user)) {
        return <Navigate to="/login" />;
    }

    // //console.log(tag);
    return (
        <div>
            {/* <Banner pageName="dashboard" /> */}
            {/* <TagSelection tag={tag} setTag={setTag} setError={setError} /> */}
            <Profile profile={userProfile}/>
            <MyPosts posts={postsOfCurrentUser} />
        </div>
    )

}

