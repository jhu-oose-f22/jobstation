import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import './Messages.css';

const Messages = ({ messages }) => {

  return (<ScrollToBottom className="messages py-2 m-0 h-100 bg-light bg-opacity-75  border border-start border-light border-opacity-50"
    behavior="auto"
  >
    {/* {console.log(messages)} */}
    {messages.map((message, i) => <div key={i}><Message message={message} /></div>)}
  </ScrollToBottom>
  );
}

export default Messages;