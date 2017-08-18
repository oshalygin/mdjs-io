import stream from 'stream';
import Multer from 'multer';

import configuration from './configuration';

function fileFilter(request, file, callback) {
  if (configuration.rejectMimeTypes.includes(file.mimetype)) {
    if (request.body.fileFilterErrors) {
      request.body.fileFilterErrors = [
        ...request.body.fileFilterErrors,
        file.originalname,
      ];
    } else {
      request.body.fileFilterErrors = [file.originalname];
    }
    callback(null, false);
  } else {
    callback(null, true);
  }
}

export const multer = Multer({
  storage: Multer.MemoryStorage,
  fileFilter,
  limits: {
    fileSize: configuration.uploadFileSizeLimit,
  },
});

//eslint-disable-next-line no-unused-vars
export function fileErrorHandler(error, request, response, next) {
  return response.status(500).send(error.code);
}

export function bufferToStream(buffer) {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(buffer);

  return bufferStream;
}
