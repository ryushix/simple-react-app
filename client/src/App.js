import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from './logo.svg';

function App() {
  // State to save files and status messages
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  // Function to handle file changes
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Function to upload files to Google Cloud Storage using signed URL
  const uploadFile = async () => {
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    try {
      // Get signed URL from backend server
      const { data } = await axios.get('http://localhost:5000/generate-signed-url', {
        params: {
          filename: file.name,
          contentType: file.type,
        },
      });

      const url = data.url;

      // Upload file to signed URL
      await axios.put(url, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      setMessage('File uploaded successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to upload file');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
            <p>
            Edit <code>src/App.js</code> and save to reload.</p>
            <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                Learn React
            </a>
        <h1>Upload Image to Google Cloud Storage</h1>
        
        {/* Input to choose file */}
        <input type="file" onChange={handleFileChange} />
        
        {/* Button for upload file*/}
        <button onClick={uploadFile}>Upload</button>
        
        {/* Tampilkan pesan status */}
        {message && <p>{message}</p>}
      </header>
    </div>

  );
}

export default App;
