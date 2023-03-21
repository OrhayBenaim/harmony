let missings = document.querySelectorAll('tr:has(img[src^="/eHarmonyNew/App/content/images/red.png"])');

const count = () => {
  missings = document.querySelectorAll('tr:has(img[src^="/eHarmonyNew/App/content/images/red.png"])');
  return missings.length;
};

const fill = () => {
  missings.forEach((missing) => {
    missing.querySelector('[aria-describedby="NameTrnFnc_startAW"] input').click();
    missing.querySelector('[aria-describedby="NameTrnFnc_startAW"] input[name="Time_startAW"]').value = "09:00";
    missing.querySelector('[aria-describedby="NameTrnFnc_startAW"] input[name="Time_startAW"]').dispatchEvent(new Event("change", { isTrusted: true, bubbles: true }));
    missing.querySelector('[aria-describedby="NameTrnFnc_startAW"] input[name="Code_startAW"]').click();
    document.querySelector('#widgetCombo-list ul[role="listbox"] li[role="option"][data-offset-index="0"]').click();

    missing.querySelector('[aria-describedby="NameTrnFnc_endAW"] input').click();
    missing.querySelector('[aria-describedby="NameTrnFnc_endAW"] input[name="Time_endAW"]').value = "18";
    missing.querySelector('[aria-describedby="NameTrnFnc_endAW"] input[name="Time_endAW"]').dispatchEvent(new Event("change", { isTrusted: true, bubbles: true }));
    missing.querySelector('[aria-describedby="NameTrnFnc_endAW"] input[name="Code_endAW"]').click();
    document.querySelector('#widgetCombo-list ul[role="listbox"] li[role="option"][data-offset-index="0"]').click();
  });
  if (missings.length > 0) {
    document.querySelector(".TitleEmplo.floutL").click();
    document.querySelector("#actionSaveButton").click();
  }
};

chrome.runtime.onMessage.addListener(({ message }, sender, sendResponse) => {
  if (message === "fill") {
    fill();
  }

  sendResponse(count());
});
