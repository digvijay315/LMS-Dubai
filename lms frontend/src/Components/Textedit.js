import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Textedit.css'

const Textedit = () => {
    const [value, setValue] = useState('');
    var toolbarOption = [
        [{ 'font': [] }, { 'size': [] }],  // Font family & size
      ['bold', 'italic', 'underline', 'strike'],  // Bold, italic, underline, strike
      [{ 'color': [] }, { 'background': [] }],  // Text color & background
      [{ 'script': 'sub' }, { 'script': 'super' }],  // Subscript / superscript
      [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],  // Headers, blockquote, code block
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],  // Ordered & unordered lists
      [{ 'indent': '-1' }, { 'indent': '+1' }],  // Indentation
      [{ 'align': [] }],  // Text align
      ['link', 'image', 'video'],  // Insert link, image, video
      ['clean'],  // Remove formatting 
    ];
    
    const module={
        toolbar:toolbarOption   
    }
  return (
    <div className='textbody'>
        <ReactQuill 
            modules={module}
            theme="snow"
            value={value} 
            onChange={setValue} 
        />
    </div>
  );
}

export default Textedit;