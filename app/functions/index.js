const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

exports.uploadFile = async(req, res) => {
    res.set('Access-Control-Allow-Origin', '*'); // Tambahkan header ini untuk mengizinkan semua origin
    res.set('Access-Control-Allow-Methods', 'POST'); // Izinkan metode POST

    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).send();
    }

    try {
        const bucketName = 'bucket_name'; // Ganti dengan nama bucket Anda
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