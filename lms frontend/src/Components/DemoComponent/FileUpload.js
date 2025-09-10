import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaTrashAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import './Css/FileUpload.css'; // Add custom CSS for better UI

const FileUpload = () => {
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ['.xlsx', '.xls'],
    multiple: true,
  });

  const removeFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.file.name !== fileName));
  };

  const handleFilePreview = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      console.log(workbook); // Process workbook here (optional)
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
        <style>
            {`
            .file-upload-container {
    margin: 20px;
    padding: 20px;
    border: 2px dashed #007bff;
    border-radius: 10px;
    text-align: center;
    background-color: #f9f9f9;
  }
  
  .dropzone {
    padding: 20px;
    cursor: pointer;
    color: #007bff;
    background-color: #f1f1f1;
    border-radius: 8px;
    transition: background-color 0.2s ease;
  }
  
  .dropzone:hover {
    background-color: #e2e2e2;
  }
  
  .files-list {
    margin-top: 20px;
  }
  
  .file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #fff;
  }
  
  .file-details {
    display: flex;
    align-items: center;
  }
  
  .file-details span {
    font-weight: bold;
    margin-right: 10px;
  }
  
  .delete-icon {
    cursor: pointer;
    color: red;
    font-size: 1.2rem;
  }
  
  .delete-icon:hover {
    color: darkred;
  }
  
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  button:hover {
    background-color: #0056b3;
  }
            `}
        </style>
        <div className="file-upload-container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop excel file for upload aatendence</p>
      </div>

      <div className="files-list">
        {files.length > 0 &&
          files.map((file, index) => (
            <div className="file-item" key={index}>
              <div className="file-details">
                <span>{file.file.name}</span>
                <button onClick={() => handleFilePreview(file.file)}>Preview</button>
              </div>
              <FaTrashAlt className="delete-icon" onClick={() => removeFile(file.file.name)} />
            </div>
          ))}
      </div>
    </div>
    </div>
  );
};

export default FileUpload;
