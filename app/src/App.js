import React from 'react';
import FileUpload from './FileUpload'; // Impor komponen FileUpload

function App() {
    return (
        <div className="App">
            <h1>File Upload to Google Cloud Storage</h1>
            <FileUpload /> {/* Tambahkan komponen FileUpload */}
        </div>
    );
}

export default App;
