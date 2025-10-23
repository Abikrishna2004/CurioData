import React, { useState } from 'react';
import { FaFolderOpen } from 'react-icons/fa';

function FileUpload({ onUpload, isLoading }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    } else {
      alert('Please select a file first.');
    }
  };

  return (
    <div className="upload-container">
      
      <div className="upload-icon">
        <FaFolderOpen />
      </div>
      
      <p>Upload your CSV or Excel file to get instant analysis.</p>
      
      <input 
        type="file" 
        onChange={handleFileChange} 
        accept=".csv, .xlsx, .xls" 
      />
      
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Analyzing...' : 'Analyze File'}
      </button>
    </div>
  );
}

export default FileUpload;