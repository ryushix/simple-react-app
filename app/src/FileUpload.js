import React, { useState } from 'react';

const FileUpload = () => {
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64data = reader.result.split(',')[1];
            const response = await fetch('URL_FUNCTION_CLOUD_ANDA', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    file: base64data,
                    fileName: file.name,
                }),
            });
            if (response.ok) {
                alert('File uploaded successfully!');
            } else {
                alert('Error uploading file.');
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div>
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload}>Upload File</button>
        </div>
    );
};

export default FileUpload;
