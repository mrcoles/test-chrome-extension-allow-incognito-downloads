const FS = (window.FS = {});

// ## Convert filename (e.g., foo.txt) to absolute filesystem path

FS.absPath = function absPath(filename) {
  return `filesystem:chrome-extension://${
    chrome.runtime.id
  }/persistent/${filename}`;
};

// ## Request filesystem (promise)
//
// () -> fs
//
window.requestFileSystem =
  window.requestFileSystem || window.webkitRequestFileSystem;

FS.requestFs = function requestFs() {
  console.log("REQUEST FS!"); //REM
  return new Promise((resolve, reject) => {
    window.requestFileSystem(window.PERSISTENT, 1024 * 1024, resolve, reject);
  });
};

// ## Create File (promise)
//
// (fs, filename) -> fileEntry
//
FS.createFile = function createFile(fs, filename) {
  console.log("createFile!", fs, filename); //REM
  return new Promise((resolve, reject) => {
    fs.root.getFile(
      filename,
      { create: true, exclusive: false },
      (fileEntry, b, c) => {
        console.log("RESOLVED createFile", fileEntry, b, c); //REM
        resolve(fileEntry);
      },
      err => reject(err)
    );
  });
};

// ## Write file (promise)
//
// (fileEntry, blob) -> fileEntry
//
FS.writeFile = function writeFile(fileEntry, blob) {
  console.log("writeFile", fileEntry); //REM
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
