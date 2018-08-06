chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  let tab = tabs[0];

  let opts = {
    url: "https://example.com",
    focused: true
  };

  if (tab.incognito) {
    opts.incognito = false;
  }

  chrome.windows.create(opts, tab => {
    console.log("opened", tab);
  });
});
