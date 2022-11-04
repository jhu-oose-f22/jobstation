import { useState, useEffect, useContext } from "react";
// import { isLoggedIn, UserContext } from "../context/User";
// import Banner from "./Utils/Banner";

export default function Dashboard({ profile }) {
    // const {user} = useContext(UserContext);

    return (
        <h2>{profile.username}</h2>
    // <div>{profile.username}</div>
    );
}
