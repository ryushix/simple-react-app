const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

exports.uploadFile = async(req, res) => {
    try {
        const bucketName = 'NAMA_BUCKET_ANDA'; // Ganti dengan nama bucket Anda
        const file = req.body.file; // File harus diupload sebagai base64 string
        const buffer = Buffer.from(file, 'base64');
        const fileName = req.body.fileName; // Nama file yang akan disimpan

        await storage.bucket(bucketName).file(fileName).save(buffer, {
            contentType: 'application/octet-stream', // Ganti dengan contentType yang sesuai
        });

        res.status(200).send('File uploaded successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading file.');
    }
};