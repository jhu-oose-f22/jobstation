
import React, { useState } from 'react';
import ReactQuill from 'react-quill';

import './Input.css';
import 'react-quill/dist/quill.snow.css';

import './Input.css';

const Input = ({ setMessage, sendMessage, message,room }) => {
    const placeholder = `Message to ${room}`
    return(
        <form className="form m-0 p-0 bg-light d-flex w-100">
            <div className='w-100'>
                <ReactQuill theme='snow'
                            value={message}
                            placeholder={placeholder}
                            onChange={e => {
                                console.log(e);
                                setMessage(e);
                            }} />
            </div>
            <button type="button" className="btn btn-primary" onClick={e => {
                sendMessage(e);
            }}>
                Send
            </button>
        </form>
    );

}

export default Input;
