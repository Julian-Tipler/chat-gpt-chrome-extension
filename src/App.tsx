import { useState } from "react";
import "./App.css";

const mockPrompts = [
  {
    id: 1,
    text: "a random number between: ",
  },
  {
    id: 2,
    text: "Please make me a poem about: ",
  },
];


function App() {
  const [prompts] = useState(mockPrompts);
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
        console.log("Currently focused 2:", focusedElement);

        const inputField = document.getElementById(
          "prompt-textarea"
        ) as HTMLInputElement;
        if (inputField) {
          // Simulate typing text into the input element
          console.log("hello");
          inputField.value = "text";
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
  
  console.log("hello world");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "30vw",
      }}
    >
      <div>
        {prompts.map((prompt) => {
          return (
            <div
              key={`prompt-${prompt.id}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>{prompt.text}</div>
              <button onClick={() => onClick()}>+</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
