import multer from "multer";
import aws from "aws-sdk";
import fs from "fs";
import { Request } from "express";
import * as dotenv from "dotenv";
dotenv.config();

const Storage = multer.memoryStorage();

interface IUploader {
  url: string;
  uploaded: Boolean;
  fileName: string;
}

function uploader(req: Request, fileType: string): Promise<IUploader> {
  return new Promise(resolve => {
    const s3 = new aws.S3({
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY
    });
    const { receiptname } = req.body;

    let name = "";
    if (receiptname) {
      name = receiptname;
    } else {
      name = `${Date.now().toString()}.${fileType}`;
    }
    s3.deleteObject(
      { Bucket: `${process.env.AWS_BUCKET}`, Key: name },
      (err, data) => {
        console.log(`${err} -> ${data}`);
      }
    );
    s3.upload(
      {
        ACL: "public-read",
        Bucket: `${process.env.AWS_BUCKET}`,
        Body: req.file.buffer,
        Key: `receipt/${name}`
      },
      (err, data) => {
        if (err) return resolve({ url: "", uploaded: false, fileName: "" });
        if (data) {
          // fs.unlinkSync(req.file.path);
          return resolve({
            url: data.Location,
            uploaded: true,
            fileName: `${name}`
          });
        }
      }
    );
  });
}

export { Storage, uploader };
