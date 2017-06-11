import googleCloudStorage from '@google-cloud/storage';
import sharp from 'sharp';
import configuration from '../../utilities/configuration';
import uuid from 'uuid/v1';
import path from 'path';

const gcs = googleCloudStorage({
  projectId: configuration.googleProject,
  // This is the service account that orchestrates communication with the bucket
  keyFilename: path.join(__dirname, '../../infrastructure/storage-service-account.json')
});

const bucket = gcs.bucket(configuration.imageStorageBucket);

//TODO: TEST THIS
function uploadOriginalImage(imageStream, photoURL, originalFileName) {

  return new Promise((resolve, reject) => {
    try {
      const originalImageName = `${photoURL}_original_${originalFileName}`;
      
      const remoteOriginalWriteStream = bucket.file(originalImageName).createWriteStream();

      remoteOriginalWriteStream.on('finish', () => {
        resolve(photoURL);
      });

      imageStream.pipe(remoteOriginalWriteStream);

    } catch (error) {
      reject(error);
    }
  });
}

//TODO: TEST THIS
function uploadCompressedImage(imageStream, photoURL) {
  return new Promise((resolve, reject) => {
    try {
      const compressedImage = `${photoURL}.png`;

      const remoteCompressedWriteStream = bucket.file(compressedImage).createWriteStream();
      remoteCompressedWriteStream.on('finish', () => {
        resolve(photoURL);
      });

      const imageFormatter = sharp()
        .resize(200, 200)
        .png();

      imageStream
        .pipe(imageFormatter)
        .pipe(remoteCompressedWriteStream);

    } catch (error) {
      reject(error);
    }
  });
}

function upload(imageStream, originalFileName) {

  const photoURL = uuid();
  const originalUploadPromise = uploadOriginalImage(imageStream, photoURL, originalFileName);
  const compressedUploadPromise = uploadCompressedImage(imageStream, photoURL);
  return Promise.all([originalUploadPromise, compressedUploadPromise]);
}

function setImageUrl(imageName) {
  
  const googleBucketPrefix = 'https://storage.googleapis.com';
  const bucketName = configuration.imageStorageBucket;
  const imageFileType = 'png';

  return `${googleBucketPrefix}/${bucketName}/${imageName}.${imageFileType}`;
}

export default {
  upload,
  uploadOriginalImage,
  uploadCompressedImage,
  imageUrl: setImageUrl
};
