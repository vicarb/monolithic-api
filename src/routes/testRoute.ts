import express from 'express';
import { Storage } from '@google-cloud/storage';
import multer from 'multer';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';


const router = express.Router();
const storage = new Storage();
const BUCKET_NAME = 'b2b-bucket-v2';



const upload = multer({ dest: 'uploads/' }); // adjust the destination as needed

router.post('/test', upload.single('file'), (req, res) => {
  if (req.file) {
    const localFile = req.file.path;
    const filename = req.file.originalname;
    const fileExtension = filename.split('.').pop();
    const remoteFilename = `${uuidv4()}.${fileExtension}`;

    const file = storage.bucket(BUCKET_NAME).file(remoteFilename);

    fs.createReadStream(localFile)
      .pipe(file.createWriteStream())
      .on('error', (err) => {
        console.error(err);
        res.status(500).json({ message: 'Error uploading file to the bucket.' });
      })
      .on('finish', () => {
        // Optionally delete the local file
        fs.unlinkSync(localFile);

        console.log('File uploaded to the bucket.');
        res.json({ message: 'File uploaded successfully!' });
      });
  } else {
    res.status(400).json({ message: 'No file provided.' });
  }
});



router.get('/test-bucket', (req, res) => {
  const bucket = storage.bucket(BUCKET_NAME);
  bucket.exists()
    .then(([exists]) => {
      if (exists) {
        res.send('Bucket connection is working!');
      } else {
        res.status(404).send('Bucket not found.');
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('An error occurred while testing the bucket connection.');
    });
});

export default router;
