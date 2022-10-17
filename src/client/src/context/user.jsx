import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "./Const";

const defaultUser = {
    user: null,
    toggleUser: () => { }
};

export const UserContext = React.createContext(defaultUser)

function useUserLogin() {


}

export default function UserContextProvider(props) {

    const [userLogin, setUserLogin] = useState({});
    //? ISSUE: how to read a previous session user context.

    console.log(userLogin);
    return (
        <UserContext.Provider value={{
            user: userLogin,
            toggleUser: setUserLogin
        }}>
            {props.children}
        </UserContext.Provider>
    );

}
