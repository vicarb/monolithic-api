// services/gcsService.ts
import { Storage } from '@google-cloud/storage';
import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

const storage = new Storage();
const bucket = storage.bucket('b2b-bucket-v2');

const multerStorage = multer.memoryStorage();
export const upload = multer({ storage: multerStorage });

export const uploadToGCS = (req: Request, res: Response, next: NextFunction) => {
  if (!req.files) {
    return next();
  }

  const filesArray = Array.isArray(req.files) ? req.files : Object.values(req.files);
  
  const promises = filesArray.map((file: any) => {
    const blob = bucket.file(uuidv4() + file.originalname);
    const blobStream = blob.createWriteStream({
      metadata: { contentType: file.mimetype },
    });

    return new Promise<string>((resolve, reject) => {
      blobStream.on('finish', () => resolve(blob.name));
      blobStream.on('error', reject);
      blobStream.end(file.buffer);
    });
  });

  Promise.all(promises)
    .then((fileNames) => {
      req.body.images = fileNames;
      next();
    })
    .catch(next);
};
