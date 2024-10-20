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
        const bucketName = 'NAMA_BUCKET_ANDA'; // change bucket name
        const file = req.body.file;
        const buffer = Buffer.from(file, 'base64');
        const fileName = req.body.fileName; // file name that in saved

        const fileUpload = storage.bucket(bucketName).file(fileName);

        // save to the bucket
        await fileUpload.save(buffer, {
            contentType: 'application/octet-stream',
        });

        // make file public a public
        await fileUpload.makePublic();

        // get UrlSigned
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

        res.status(200).send({
            message: 'File uploaded successfully.',
            publicUrl: publicUrl,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading file.');
    }
};