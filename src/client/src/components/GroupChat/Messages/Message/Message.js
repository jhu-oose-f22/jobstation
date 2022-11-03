import React from 'react';

import './Message.css';
import 'react-quill/dist/quill.bubble.css';
<<<<<<< HEAD
import 'highlight.js/styles/github-dark.css';

import ReactEmoji from 'react-emoji';
import ReactQuill from 'react-quill';
=======
import ReactQuill from "react-quill";
>>>>>>> 0e8f77957ac039a052a3e34550de8824ede01b5f

const Message = ({ message: { text, user }, name }) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

<<<<<<< HEAD
  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }


  const modules = {
    syntax: true
  }


  const messageBubble = <ReactQuill
    theme='bubble'
    readOnly={true}
    value={text}
    modules={modules}
  />

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd  ">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue border border-dark border-1 my-2 py-0">
            {messageBubble}
          </div>
        </div>
      )
      : (
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundLight  border border-dark border-1 my-2 text-dark">
            {messageBubble}
          </div>
          <p className="sentText pl-10 ">{user}</p>
        </div>
      )
  );
=======
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
>>>>>>> 0e8f77957ac039a052a3e34550de8824ede01b5f
}

export default Message;
