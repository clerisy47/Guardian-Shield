chrome.browserAction.onClicked.addListener((tab) => {
  // if (tab.url.contains("https://mail.google.com/mail/u/0/#inbox/")) {
  chrome.tabs.sendMessage(tab.id, { action: "runExtension" });
  // }
});
