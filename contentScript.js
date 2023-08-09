const pageURL = window.location.href;
const pageTitle = document.title;

chrome.runtime.sendMessage({
  type: "pageInfo",
  url: pageURL,
  title: pageTitle
});
