const popupForm = document.querySelector("#popup-form");
const linkInput = document.querySelector("#link-input");
const titleInput = document.querySelector("#title-input");

const value = {
  server: "",
  token: ""
}

async function getStorageValue() {
  try {
    const result = await browser.storage.local.get(value);
    return result;
  } catch (error) {
    console.log("Error retrieving server and token value", error);
  }
}

async function submitData(link, title) {
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
  } catch (error) {
    console.log("Submit error", error);
  }
}

function handleSubmit(e) {
  e.preventDefault();
  submitData(linkInput.value, titleInput.value);
}

browser.tabs.query({ currentWindow: true, active: true }, ([tab]) => {
  linkInput.value = tab.url;
  titleInput.value = tab.title;

  linkInput.title = tab.url;
  titleInput.title = tab.title;
});

popupForm.addEventListener("submit", handleSubmit);
