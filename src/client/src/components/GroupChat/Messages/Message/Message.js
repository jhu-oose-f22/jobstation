import React from 'react';

import './Message.css';
import 'react-quill/dist/quill.bubble.css';
import ReactQuill from "react-quill";

const Message = ({ message: { text, user }, name }) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName) {
        isSentByCurrentUser = true;
    }
    const messageBubble = <ReactQuill
        theme='bubble'
        readOnly={true}
        value={text}

    />
    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer justifyEnd  ">
                    <p className="sentText pr-10">{trimmedName}</p>
                    <div className="messageBoxSelf my-2">
                        {messageBubble}
                    </div>
                </div>
            )
            : (
                <div className="messageContainer justifyStart">
                    <div className="messageBoxOther text-dark my-2">
                        {messageBubble}
                    </div>
                    <p className="sentText pl-10 ">{user}</p>
                </div>
            )
    );
}

export default Message;
