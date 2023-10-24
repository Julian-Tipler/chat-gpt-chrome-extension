function addPrompt(textToInsert) {
  const chatInput = document.querySelector("input[type='text']"); // You may need to adjust the selector

  if (chatInput) {
    chatInput.value = textToInsert;
  }
}
