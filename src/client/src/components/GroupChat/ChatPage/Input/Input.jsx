import React, { useState } from 'react';
import ReactQuill from 'react-quill';

import './Input.css';
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
    <form className="form m-0 p-0 bg-light d-flex w-100 h-25 d-flex flex-column">
      <ReactQuill theme='snow'
        className='h-100 '
        modules={modules}
        formats={formats}
        value={message}
        placeholder='enter something...'
        onChange={e => {
          setMessage(e);
        }} />
      <button id="send" className="btn btn-success text-center px-2 py-1" onClick={e => {
        sendMessage(e);
      }}>
        <i className="fa-regular fa-paper-plane me-2"></i>
        Send
      </button>
    </form>
  );
}

export default Input;