<<<<<<< HEAD
=======

>>>>>>> 0e8f77957ac039a052a3e34550de8824ede01b5f
import React, { useState } from 'react';
import ReactQuill from 'react-quill';

import './Input.css';
<<<<<<< HEAD
import 'highlight.js/styles/github-dark.css';
import 'react-quill/dist/quill.snow.css';

function Input({ setMessage, sendMessage, message }) {

  // configurations

  const modules = {
    syntax: true,
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      ['link', 'image']
    ],
  }

  const formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'code-block',
  ]

  return (
    <form className="form m-0 p-0 bg-light d-flex w-100">
      <div className='w-100'>
        <ReactQuill theme='snow'
          modules={modules}
          formats={formats}
          value={message}
          placeholder='enter something...'
          onChange={e => {
            console.log(e);
            setMessage(e);
          }} />
      </div>
      <button className="btn btn-primary px-3 rounded-0 col-1" onClick={e => {
        console.log(message);
        sendMessage(e);
      }}>
        Send
      </button>
    </form>
  );
}

export default Input;
=======
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
>>>>>>> 0e8f77957ac039a052a3e34550de8824ede01b5f
