function scrapeEmailsFromPage() {
  let heading = document.querySelector(".hP").textContent;
  let text = document
    .querySelector(".a3s")
    .textContent.replace(/\n+/g, "\n")
    .replace(/\s+/g, " ");
  data = heading + "\n" + text;
  console.log(data);
  alert(`This mail is about ${heading.split(" ")[0]}`);
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "runExtension") {
    scrapeEmailsFromPage();
  }
});
