const popupSetup = document.querySelector("#popup-setup");
const popupLinkOption = document.querySelector("#popup-link-option");
const popupMain = document.querySelector("#popup-main");
const popupForm = document.querySelector("#popup-form");
const linkInput = document.querySelector("#link-input");
const titleInput = document.querySelector("#title-input");
const stateLoading = document.querySelector("#state-loading");
const stateSuccess = document.querySelector("#state-success");
const stateError = document.querySelector("#state-error");

const value = {
  server: "",
  token: ""
};

async function getStorageValue() {
  try {
    const result = await browser.storage.local.get(value);
    return result;
  } catch (error) {
    console.log("Error retrieving server and token value", error);
  }
}

function showState(state) {
  if (state === "loading") {
    stateLoading.className = "";
    stateSuccess.className = "hidden";
    stateError.className = "hidden";
  } else if (state === "success") {
    stateLoading.className = "hidden";
    stateSuccess.className = "";
    stateError.className = "hidden";
  } else if (state === "error") {
    stateLoading.className = "hidden";
    stateSuccess.className = "hidden";
    stateError.className = "";
  }
}

async function submitData(link, title) {
  showState("loading");
  const { server, token } = await getStorageValue();

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };

    const query = `
      mutation AddReadList($data: ReadListInput!) {
        addReadList(data: $data) {
          id
          title
          link
        }
      }
    `;

    const variables = {
      data: {
        link,
        title,
        readAt: new Date().toISOString(),
        comment: null
      }
    };

    await fetch(server, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables
      })
    });

    showState("success");
  } catch (error) {
    console.log("Submit error", error);
    showState("error");
  }
}

function handleSubmit(e) {
  e.preventDefault();
  submitData(linkInput.value, titleInput.value);
}

function handleLink(e) {
  e.preventDefault();
  browser.runtime.openOptionsPage();
}

function fillInput(link, title) {
  linkInput.value = link;
  titleInput.value = title;

  linkInput.title = link;
  titleInput.title = title;
}

browser.tabs.query({ currentWindow: true, active: true }, async ([tab]) => {
  const { server, token } = await getStorageValue();

  if (server === "" || token === "") {
    popupSetup.className = "";
    popupMain.className = "hidden";
  } else {
    popupMain.className = "";
    popupSetup.className = "hidden";
    fillInput(tab.url, tab.title);
  }
});

popupForm.addEventListener("submit", handleSubmit);
popupLinkOption.addEventListener("click", handleLink);
