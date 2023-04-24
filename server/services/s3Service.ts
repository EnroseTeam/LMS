import { S3 } from "aws-sdk";
import { nanoid } from "nanoid";
import env from "../configs/validateEnv";

export const s3UploadImage = async (file: Express.Multer.File) => {
  const s3 = new S3();

  const params: S3.PutObjectRequest = {
    Bucket: env.AWS_BUCKET_NAME,
    Key: `images/${nanoid()}-${file.originalname}`,
    Body: file.buffer,
  };

  const result = await s3.upload(params).promise();
  return result;
};

export const s3UploadSvg = async (file: Express.Multer.File) => {
  const s3 = new S3();

  const params: S3.PutObjectRequest = {
    Bucket: env.AWS_BUCKET_NAME,
    Key: `svgImages/${nanoid()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: "image/svg+xml",
  };

  const result = await s3.upload(params).promise();
  return result;
};

export const s3UploadVideo = async (file: Express.Multer.File) => {
  const s3 = new S3();

  const params: S3.PutObjectRequest = {
    Bucket: env.AWS_BUCKET_NAME,
    Key: `videos/${nanoid()}-${file.originalname}`,
    Body: file.buffer,
  };

  const result = await s3.upload(params).promise();
  return result;
};
