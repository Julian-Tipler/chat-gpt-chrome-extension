chrome.action.onClicked.addListener((tab) => {
  tab.id &&
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => console.log("background script"),
    });
});

function copyTextToGPT() {
  const textToCopy = "Text from extension"; // Replace with your text
  chrome.runtime.sendMessage({ text: textToCopy });
}

