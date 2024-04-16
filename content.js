const selector = 'tr:has(img[src^="/eHarmonyNew/App/content/images/red.png"])';

let missings = document.querySelectorAll(selector);

const count = () => {
  missings = document.querySelectorAll(selector);
  return missings.length;
};

const waitForElement = (selector, hidden = false) => {
  return new Promise((resolve) => {
    const check = () => {
      requestAnimationFrame(() => {
        const element = document.querySelector(selector);
        if (
          !element === hidden ||
          (element && !element.checkVisibility() === hidden)
        ) {
          resolve();
        } else {
          check();
        }
      });
    };
    check();
  });
};

const fill = async (time) => {
  missings.forEach((missing) => {
    missing
      .querySelector('[aria-describedby="NameTrnFnc_startAW"] input')
      .click();
    missing.querySelector(
      '[aria-describedby="NameTrnFnc_startAW"] input[name="Time_startAW"]'
    ).value = `${time.start}:00`;
    missing
      .querySelector(
        '[aria-describedby="NameTrnFnc_startAW"] input[name="Time_startAW"]'
      )
      .dispatchEvent(new Event("change", { isTrusted: true, bubbles: true }));
    missing
      .querySelector(
        '[aria-describedby="NameTrnFnc_startAW"] input[name="Code_startAW"]'
      )
      .click();
    document
      .querySelector(
        '#widgetCombo-list ul[role="listbox"] li[role="option"][data-offset-index="0"]'
      )
      .click();

    missing
      .querySelector('[aria-describedby="NameTrnFnc_endAW"] input')
      .click();
    missing.querySelector(
      '[aria-describedby="NameTrnFnc_endAW"] input[name="Time_endAW"]'
    ).value = time.end;
    missing
      .querySelector(
        '[aria-describedby="NameTrnFnc_endAW"] input[name="Time_endAW"]'
      )
      .dispatchEvent(new Event("change", { isTrusted: true, bubbles: true }));
    missing
      .querySelector(
        '[aria-describedby="NameTrnFnc_endAW"] input[name="Code_endAW"]'
      )
      .click();
    document
      .querySelector(
        '#widgetCombo-list ul[role="listbox"] li[role="option"][data-offset-index="0"]'
      )
      .click();
  });
  if (missings.length > 0) {
    document.querySelector(".TitleEmplo.floutL").click();
    document.querySelector("#actionSaveButton").click();
  }

  await waitForElement(".k-loading-image", false);
  await waitForElement(".k-loading-image", true);
};

chrome.runtime.onMessage.addListener(
  ({ message, time }, sender, sendResponse) => {
    (async () => {
      if (message === "fill") {
        await fill(time);
      }

      sendResponse(count());
    })();
    return true;
  }
);
