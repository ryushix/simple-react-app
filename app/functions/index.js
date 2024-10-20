const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

exports.uploadFile = async(req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST');

    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).send();
    }

    try {
        const bucketName = 'bucket_name'; // change the bucket name
        const file = req.body.file;
        const buffer = Buffer.from(file, 'base64');
        const fileName = req.body.fileName;

        await storage.bucket(bucketName).file(fileName).save(buffer, {
            contentType: 'application/octet-stream',
        });

        res.status(200).send('File uploaded successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading file.');
    }
};