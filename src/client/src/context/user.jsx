import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "./Const";

const defaultUser = {
    user: null,
    toggleUser: () => { }
};

export const UserContext = React.createContext(defaultUser)

export default function UserContextProvider(props) {

    const [userLogin, setUserLogin] = useState({});
    //? ISSUE: how to read a previous session user context.

    return (
        <UserContext.Provider value={{
            user: userLogin,
            toggleUser: setUserLogin
        }}>
            {props.children}
        </UserContext.Provider>
    );

}

/**
 *  Helper Function
 * @param {Object} user in UserContext
 * @returns {Boolean} is logged in.
 */
export function isLoggedIn(user) {
    return user && Object.keys(user).length !== 0;
}