const express = require('express');
const { Storage } = require('@google-cloud/storage');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const storage = new Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME);

app.get('/generate-signed-url', async(req, res) => {
    try {
        const { filename, contentType } = req.query;

        const options = {
            version: 'v4',
            action: 'write',
            expires: Date.now() + 15 * 60 * 1000, // URL berlaku selama 15 menit
            contentType,
        };

        const [url] = await bucket.file(filename).getSignedUrl(options);

        res.status(200).send({ url });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});