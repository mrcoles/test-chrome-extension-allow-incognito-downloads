const FSAPI = (window.FSAPI = {});

// ## Request filesystem (promise)
//
// () -> fs
//
window.requestFileSystem =
  window.requestFileSystem || window.webkitRequestFileSystem;

FSAPI.requestFs = function requestFs() {
  return new Promise((resolve, reject) => {
    window.requestFileSystem(window.PERSISTENT, 1024 * 1024, resolve, reject);
  });
};

// ## Create File (promise)
//
// (fs, filename) -> fileEntry
//
FSAPI.createFile = function createFile(fs, filename) {
  return new Promise((resolve, reject) => {
    fs.root.getFile(
      filename,
      { create: true, exclusive: false },
      fileEntry => resolve(fileEntry),
      err => reject(err)
    );
  });
};

// ## Write file (promise)
//
// (fileEntry, blob) -> fileEntry
//
FSAPI.writeFile = function writeFile(fileEntry, blob) {
  return new Promise((resolve, reject) => {
    fileEntry.createWriter(
      fileWriter => {
        fileWriter.onwriteend = e => resolve(fileEntry);
        fileWriter.onerror = e => reject(e);
        fileWriter.write(blob);
      },
      e => reject(e)
    );
  });
};
