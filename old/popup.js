document.addEventListener("DOMContentLoaded", function () {
  async function sayHello() {
    console.log("hello");
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        console.log("hello world console log");
      },
    });
  }

  document
    .getElementById("copyButton")
    .addEventListener("click", () => sayHello());
});
