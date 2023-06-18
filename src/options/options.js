const optionsForm = document.querySelector("#options-form");
const serverInput = document.querySelector("#server-input");
const tokenInput = document.querySelector("#token-input");
const stateLoading = document.querySelector("#state-loading");
const stateSuccess = document.querySelector("#state-success");
const stateError = document.querySelector("#state-error");

const value = {
  server: "",
  token: ""
};

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

async function saveData(server, token) {
  showState("loading");
  try {
    await browser.storage.local.set({
      server,
      token
    });
    showState("success");
  } catch (error) {
    console.log("Error saving server and token value", error);
    showState("error");
  }
}

function handleSubmit(e) {
  e.preventDefault();
  saveData(serverInput.value, tokenInput.value);
}

browser.storage.local.get(value).then(
  item => {
    serverInput.value = item.server;
    tokenInput.value = item.token;
  },
  error => {
    console.log("Error retrieving server and token value", error);
  }
);

optionsForm.addEventListener("submit", handleSubmit);
