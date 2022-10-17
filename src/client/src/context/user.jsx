import React, { useEffect } from "react";

export const UserContext = React.createContext({})

export default function UserContextProvider(props) {
    let userLogin = {
        id: '123414',
        userName: 'wby',
        avatar: null,
    };

    // TODO: get user status from server.

    return (
        <UserContext.Provider value={userLogin}>
            {props.children}
        </UserContext.Provider>
    );

}
