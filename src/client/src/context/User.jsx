import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "./Const";

const defaultUser = {
    user: null,
    token: null,
    toggleUser: () => { },
    toggleToken: () => { },
};

export const UserContext = React.createContext(defaultUser)

export default function UserContextProvider(props) {

    const [userLogin, setUserLogin] = useState(JSON.parse(sessionStorage.getItem('userLogin')));
    const [token, setToken] = useState(sessionStorage.getItem('token'));
    const userStorage = JSON.parse(localStorage.getItem('userLogin'));
    // TODO get user status.
    useEffect(() => {
        if (isLoggedIn(userStorage) && !isLoggedIn(userLogin)) setUserLogin(userStorage);
    }, [userLogin, userStorage])
    return (
        <UserContext.Provider value={{
            user: userLogin,
            toggleUser: setUserLogin,
            token: token,
            toggleToken: setToken,
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
