const optionsForm = document.querySelector("#options-form");
const serverInput = document.querySelector("#server-input");
const tokenInput = document.querySelector("#token-input");

const value = {
  server: "",
  token: ""
};

async function saveData(server, token) {
  try {
    await browser.storage.local.set({
      server,
      token
    });
  } catch (error) {
    console.log("Error saving server and token value", error);
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
