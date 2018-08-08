# Regression: chrome.downloads.download when allow incognito

In Chrome v68 calling `chrome.downloads.download` on an HTML5 filesytem file is failing with "Failed - Network error" when the extension has "Allow in incognito" enabled in the Chrome settings.

This is a regression from v67.

Triggered in Mac OS X and Windows.
