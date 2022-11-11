import React, { useContext } from 'react';

import './Message.css';
import 'react-quill/dist/quill.bubble.css';
import 'highlight.js/styles/github-dark.css';

import ReactQuill from 'react-quill';
import { UserContext } from '../../../../context/User';

const Message = ({ message: { text, user } }) => {
  let isSentByCurrentUser = false;
  const { user: userLogin } = useContext(UserContext);

  if (user === userLogin.username) {
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
          <p className="sentText pr-10 my-auto">{userLogin.username}</p>
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
}

export default Message;