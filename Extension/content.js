function cleanText(rawText) {
  return rawText.replace(/\n+/g, "\n").replace(/\s+/g, " ");
}

function scrapeEmailsFromPage() {
  const heading = document.querySelector(".hP").textContent;
  const rawText = document.querySelector(".a3s").textContent;
  const text = cleanText(rawText);
  data = heading + "\n" + text;
  return data;
}

const isMail = (url) => {
  return url.includes("mail.google.com");
};

const hasTermsAndConditions = () => {
  const regex = /terms\s+and\s+conditions/i;
  for (let i = 1; i <= 6; i++) {
    let found = false;
    document.querySelectorAll(`h${i}`).forEach((head) => {
      if (regex.test(head.textContent)) {
        found = true;
      }
    });
    if (found) {
      return true;
    }
  }
  return false;
};
const scrapeTermsAndConditions = () => {
  const tandc = document.querySelector("#primary");
  if (tandc) {
    return cleanText(tandc.textContent);
  }
};

const isPhising = (url) => {
  targetUrl = "http://fakebook/login.html";
  return url === targetUrl;
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request.url);
  if (request.pageChanged || request.action) {
    if (isMail(request.url)) {
      const data = scrapeEmailsFromPage();
      //Check for spam or ham
      let spam = 1;
      if (spam) {
        alert(
          "WARNING: GUARDIAN SHEILD has detected potential fraudulent activity associated with this email!\n 1.  Avoid clicking links or downloading attachments.\n 2.  Do not provide personal information"
        );
      }
    } else if (hasTermsAndConditions(request.url)) {
      const data = scrapeTermsAndConditions();
      let summary = "get summary";
      alert("GUARDIAN SHEILD SUMMARIZER\n\nSummary.");
    } else if (isPhising(request.url)) {
      alert(
        "We have identified this website as a potential phishing site. Your security is our top priority. Please take immediate action:\n1. **Do not enter any personal information.**\n2. **Do not proceed or interact with the site.**\n3. **Close this tab or browser immediately.**"
      );
    }
  }
});
