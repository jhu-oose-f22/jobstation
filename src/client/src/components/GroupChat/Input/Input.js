import React from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form container m-0 p-0 w-100">
    <div className='row w-100 m-0'>
      <input
        className="input col-11"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
      />
      <button className="btn btn-primary px-3 rounded-0 col-1" onClick={e => sendMessage(e)}>
        Send
      </button>
    </div>
  </form>
)

export default Input;