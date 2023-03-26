const urlRegex = /^https?:\/\/(?:[^./?#]+\.)?harmony\.synel\.co\.il/;

const startSelect = document.querySelector("#start");
const endSelect = document.querySelector("#end");

startSelect.addEventListener("change", (e) => {
  const start = e.target.selectedOptions[0].value;
  time.start = start;
});

endSelect.addEventListener("change", (e) => {
  const end = e.target.selectedOptions[0].value;
  time.end = end;
});

const updateCount = (length) => {
  const countElement = document.querySelector("#count");
  countElement.innerHTML = length;
};

const getStart = () => {
  return startSelect.selectedOptions[0].value;
};

const getEnd = () => {
  return endSelect.selectedOptions[0].value;
};

let time = {
  start: getStart(),
  end: getEnd(),
};
document.querySelector("#autoFill").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  const response = await chrome.tabs.sendMessage(tab.id, { message: "fill", time });
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
