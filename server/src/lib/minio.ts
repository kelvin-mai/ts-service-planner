import * as Minio from 'minio';

export const minio = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  accessKey: 'OMZZnwYfgYRbcZPW',
  secretKey: 'GhjudYpnujI0EGVuPSnccUE9JEyiko1m',
  useSSL: false,
});

export const uploadFile = (filename: string, buffer: string | Buffer) => {
  return new Promise<Minio.UploadedObjectInfo>((resolve, reject) =>
    minio.putObject('example', filename, buffer, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  );
};

export const getFileURL = (filename: string) => {
  return new Promise<string>((resolve, reject) => {
    minio.presignedGetObject('example', filename, (err, url) => {
      if (err) {
        reject(err);
      }
      resolve(url);
    });
  });
};

export const deleteFile = async (filename: string) => {
  await minio.removeObject('example', filename);
};
