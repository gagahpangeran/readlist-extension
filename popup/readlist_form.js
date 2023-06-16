browser.tabs.query({ currentWindow: true, active: true }, (tabs) => {
  const tab = tabs[0];

  const linkInput = document.querySelector("#link-input");
  const titleInput = document.querySelector("#title-input");

  linkInput.value = tab.url;
  titleInput.value = tab.title;

  linkInput.title = tab.url;
  titleInput.title = tab.title;
})

