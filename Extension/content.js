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
  const allDivs = document.querySelectorAll("div");
  allDivs.forEach((div) => {
    if (
      div.textContent.includes("Terms and Conditions") &&
      div.textContent.length > 500
    ) {
      return div.textContent;
    }
  });
};

function isPotentialPhishing(url) {
  // official URLS
  const safeUrls = [
    "https://www.facebook.com",
    "https://www.instagram.com",
    "https://www.twitter.com",
  ];

  // Calculating similarity percentage
  let similarityPercentage;
  for (let i = 0; i < safeUrls.length; i++) {
    similarityPercentage = calculateStringSimilarity(url, facebookUrl);
    if (similarityPercentage > 80) {
      break;
    }
  }

  // threshold for potential phising
  const threshold = 80;

  // Checking if the similarity percentage is above the threshold
  return similarityPercentage >= threshold;
}

function calculateStringSimilarity(str1, str2) {
  const longerStr = str1.length > str2.length ? str1 : str2;
  const shorterStr = str1.length > str2.length ? str2 : str1;

  const longerLength = longerStr.length;
  if (longerLength === 0) {
    return 100.0;
  }

  const similarity =
    ((longerLength - editDistance(longerStr, shorterStr)) /
      parseFloat(longerLength)) *
    100;
  return similarity;
}

function editDistance(str1, str2) {
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  const costs = new Array();
  for (let i = 0; i <= str1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= str2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (str1.charAt(i - 1) !== str2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) {
      costs[str2.length] = lastValue;
    }
  }
  return costs[str2.length];
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request.url);
  if (request.pageChanged || request.action) {
    //Runs if user opens mail or clicks icon on mail tab
    if (isMail(request.url)) {
      const content = scrapeEmailsFromPage();
      const data = {
        text: content,
      };
      const url = "http://localhost:8000/predict";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          //High probability of being fraud!
          if (data.text > 50) {
            alert(
              "WARNING: GUARDIAN SHEILD has detected potential fraudulent activity associated with this email!\n 1.  Avoid clicking links or downloading attachments.\n 2.  Do not provide personal information"
            );
          } else {
            alert(
              `This mail has only ${data.text}% probability of being fraud/scam.`
            );
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (hasTermsAndConditions(request.url)) {
      const content = scrapeTermsAndConditions();
      const data = { text: content };
      const url = "http://localhost:8000/summarize";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          //Summarizing terms and conditions
          alert(`GUARDIAN SHEILD SUMMARIZER\n\n${data.summary}.`);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (isPotentialPhishing(request.url)) {
      //Potential Phising
      alert(
        "We have identified this website as a potential phishing site. Your security is our top priority. Please take immediate action:\n1. **Do not enter any personal information.**\n2. **Do not proceed or interact with the site.**\n3. **Close this tab or browser immediately.**"
      );
    }
  }
});
