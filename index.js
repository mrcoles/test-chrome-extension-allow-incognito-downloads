const IMG_NAME = "test.jpg";
const IMG_PATH = `./${IMG_NAME}`;
const FILESYSTEM_PATH = `filesystem:chrome-extension://${
  chrome.runtime.id
}/persistent/${IMG_NAME}`;

document.getElementById("download").addEventListener(
  "click",
  e => {
    // make file
    fetch(IMG_PATH)
      .then(resp => resp.blob())
      .then(blob => {
        console.log("GOT BLOB!", blob); //REM
        return FS.requestFs()
          .then(fs => FS.createFile(fs, IMG_PATH))
          .then(fileEntry => FS.writeFile(fileEntry, blob));
      })
      .then(fileEntry => {
        window._fileEntry = fileEntry; //REM
        console.log("Created!", FILESYSTEM_PATH, fileEntry);
        let url = FILESYSTEM_PATH;
        chrome.downloads.download({ url }, downloadId => {
          console.log("DOWNLOAD?", chrome.runtime.lastError, downloadId); //REM
        });
        chrome.tabs.create({ url });
      })
      .catch(e => {
        console.log("ERROR", e);
      });

    // download
    // let fullPath = Util.absPath(Util.FILENAME);
    // Util.downloadURL(fullPath, (err, downloadId) => {
    //   console.log("DOWNLOAD", err, downloadId); //REM
    // });
  },
  false
);
