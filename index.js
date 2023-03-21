const urlRegex = /^https?:\/\/(?:[^./?#]+\.)?harmony\.synel\.co\.il/;

const updateCount = (length) => {
  const countElement = document.querySelector("#count");
  countElement.innerHTML = length;
};

document.querySelector("#autoFill").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  const response = await chrome.tabs.sendMessage(tab.id, { message: "fill" });
  updateCount(response);
});

document.querySelector("#refresh").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  const response = await chrome.tabs.sendMessage(tab.id, { message: "refresh" });
  updateCount(response);
});

(async () => {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  const response = await chrome.tabs.sendMessage(tab.id, { message: "init" });
  // do something with response here, not outside the function
  updateCount(response);
})();
