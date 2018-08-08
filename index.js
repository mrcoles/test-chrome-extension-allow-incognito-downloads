const IMG_PATH = `./test.txt`;
const FILESYSTEM_PATH = `filesystem:chrome-extension://${
  chrome.runtime.id
}/persistent/${IMG_PATH}`;

document.getElementById("settings-url").innerText = `chrome://extensions/?id=${
  chrome.runtime.id
}`;

document.getElementById("download").addEventListener("click", e => {
  let blob = new Blob(["Lorem Ipsum"], { type: "text/plain" });

  FSAPI.requestFs()
    .then(fs => FSAPI.createFile(fs, IMG_PATH))
    .then(fileEntry => FSAPI.writeFile(fileEntry, blob))
    .then(fileEntry => {
      let url = FILESYSTEM_PATH;
      chrome.downloads.download({ url }, downloadId => {
        console.log("DOWNLOAD", chrome.runtime.lastError, downloadId);
      });
    })
    .catch(e => {
      console.log("ERROR", e);
    });
});
