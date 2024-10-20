import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from './logo.svg';

function App() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
  
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  
    const uploadFile = async () => {
      if (!file) {
        setMessage('Please select a file');
        return;
      }
  
      try {
        // Ganti URL ini dengan URL Cloud Function kamu
        const { data } = await axios.get('https://REGION-PROJECT_ID.cloudfunctions.net/generateSignedUrl', {
          params: {
            filename: file.name,
            contentType: file.type,
          },
        });
  
        const url = data.url;
  
        // Upload file ke signed URL
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
                <input type="file" onChange={handleFileChange} />
                <button onClick={uploadFile}>Upload</button>
                {message && <p>{message}</p>}
            </header>
        </div>
  );
}

export default App;
