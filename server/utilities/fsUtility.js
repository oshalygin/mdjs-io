import fs from 'fs';

function unlink(path) {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (error) => {
      if (error) {
        reject(error);
      }

      resolve();
    });
  });
}

export default {
  unlink
};
