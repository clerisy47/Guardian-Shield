chrome.browserAction.onClicked.addListener((tab) => {
  //Runs on clicking icon
  chrome.tabs.sendMessage(tab.id, { action: "runExtension", url: tab.url });
});

const tabStatus = {};
chrome.webNavigation.onCompleted.addListener(function (details) {
  const { tabId, url } = details;
  // Check if the tab status is undefined which ensures it's the first time tab loading
  if (tabStatus[tabId] === undefined) {
    // Update the tab status to indicate the first load
    tabStatus[tabId] = "firstLoad";

    // Send a message to the content script only on the first load
    chrome.tabs.sendMessage(tabId, { pageChanged: true, url: url });
  }
});
