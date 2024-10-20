const { Storage } = require('@google-cloud/storage');

// Inisialisasi Google Cloud Storage
const storage = new Storage();

exports.generateSignedUrl = async(req, res) => {
    try {
        const { filename, contentType } = req.query;

        // Pastikan filename dan contentType diisi
        if (!filename || !contentType) {
            return res.status(400).send('Filename and contentType are required');
        }

        // Bucket name Google Cloud Storage
        const bucketName = 'your-gcs-bucket-name';
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(filename);

        // option for signed URL
        const options = {
            version: 'v4',
            action: 'write',
            expires: Date.now() + 15 * 60 * 1000, // 15 menit
            contentType,
        };

        // get signed URL
        const [url] = await file.getSignedUrl(options);

        // Kirim URL ke client
        res.status(200).send({ url });
    } catch (error) {
        console.error('Error generating signed URL:', error);
        res.status(500).send('Internal Server Error');
    }
};