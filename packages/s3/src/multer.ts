import {
  BucketAlreadyExists,
  CreateBucketCommand,
  DeleteObjectCommand,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
  S3ServiceException,
} from "@aws-sdk/client-s3";
import { Logger } from "@nestjs/common";
import { Request } from "express";
import crypto from "node:crypto";

export interface S3File {
  readonly bucket: string;
  readonly key: string;
  readonly contentType: string;
  readonly etag: string;
  readonly versionId: string;
  readonly size: number;
}

interface S3StorageEngineOptions {
  /** Instance of the S3 client */
  client: S3Client;
  /** Bucket to use for uploading */
  bucket: string;
  /** Provide function to generate custom file names */
  generateFilename?: (req: Request, file: Express.Multer.File) => string;
}

type StorageEngineCallbackFn<TInfo = any> = (
  err: Error | null,
  info?: TInfo
) => void;

class S3StorageEngine {
  private readonly _logger = new Logger(S3StorageEngine.name);

  constructor(private readonly _opts: S3StorageEngineOptions) {}

  private _checkMimeType(file: Express.Multer.File) {
    return file.mimetype;
  }

  _handleFile(
    req: Request,
    file: Express.Multer.File,
    cb: StorageEngineCallbackFn
  ) {
    const mimetype = this._checkMimeType(file);
    const filename = this._opts.generateFilename
      ? this._opts.generateFilename(req, file)
      : crypto.randomUUID();

    const uploadCommand = new PutObjectCommand({
      Bucket: this._opts.bucket,
      Key: filename,
      ContentType: mimetype,
      Body: file.stream,
    });

    // Create bucket and if fails due to already existing,
    // proceed to upload the file
    this._opts.client
      .send(
        new CreateBucketCommand({
          Bucket: this._opts.bucket,
        })
      )
      .then((output): null => {
        this._logger.log(`Created S3 bucket: ${output.Location}`);
        return null;
      })
      // Check if failed due to bucket already existing
      .catch((err: Error) => {
        if (err.name !== BucketAlreadyExists.name) return err;
        return null;
      })
      // After bucket was created, or it failed due to bucket already existing,
      // we now upload the file
      .then((err: Error | null) => {
        if (err) {
          cb(err, null);
          return;
        }

        this._opts.client
          .send(uploadCommand)
          .then((output: PutObjectCommandOutput) => {
            cb(null, {
              bucket: this._opts.bucket,
              key: filename,
              contentType: mimetype,
              size: output.Size,
              etag: output.ETag,
              versionId: output.VersionId,
            } satisfies S3File);
          })
          .catch((err: Error) => {
            this._logger.error(
              `Failed uploading file to S3: ${err.message}`,
              err.stack
            );
            cb(err, null);
          });
      });
  }

  _removeFile(req: Request, file: any, cb: StorageEngineCallbackFn) {
    this._opts.client.send(
      new DeleteObjectCommand({
        Bucket: file.bucket,
        Key: file.key,
      }),
      cb
    );
  }
}

export function multerS3Storage(options: S3StorageEngineOptions) {
  return new S3StorageEngine(options);
}
