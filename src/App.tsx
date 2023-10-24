import { useState } from "react";
import "./App.css";

function App() {
  const [text] = useState("text");
  // define function to run
  const onClick = async () => {
    // grab tab from active tab
    const [tab] = await chrome.tabs.query({ active: true });
    // run special chrome.scripting.executeScript function
    // this is the weird part. I think it is because we have to define a target
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        document.body.click();
        const focusedElement = document.activeElement;
        console.log("Currently focused element:", focusedElement);

        const inputField = document.getElementById(
          "prompt-textarea"
        ) as HTMLInputElement;
        if (inputField) {
          // Simulate typing text into the input element
          inputField.value = "Your text here";
          inputField.selectionStart = inputField.selectionEnd =
            inputField.value.length;

          inputField.focus();

          // Trigger a change event to notify any listeners of the change
          const inputEvent = new Event("input", {
            bubbles: true,
            cancelable: true,
          });
          inputField.dispatchEvent(inputEvent);
        }
      },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button onClick={onClick}>Add a the text</button>
      <div>{text}</div>
    </div>
  );
}

export default App;
