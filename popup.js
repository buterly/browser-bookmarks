const div = document.getElementById("div1")

// Create elements at extension page and at localstorage
function elementMaker(url, updateStorage = true) {

  // Run if storage is to be updated
  if (updateStorage) {

    chrome.storage.local.get('links', (result) => {
      link_list = result.links
      link_list.push(url)
      chrome.storage.local.set({ links: link_list });
    })
  }

  child = document.createElement('span')
  child.innerHTML = url
  div.appendChild(child)
  div.appendChild(document.createElement('br'))

}

// Function for retrieving all the links and making an element
function elementRetirever() {
  chrome.storage.local.get('links', (result) => {

    result.links.forEach(link => {
      elementMaker(link, false) // False means do not update storage
    });

  })
}

// Loads all the links when user taps on the extension
elementRetirever()

// Submit button
document.getElementById("submit").addEventListener("click", () => {

  let input = document.getElementById("link").value
  elementMaker(input);
});

// Reset button
document.getElementById("reset").addEventListener("click", () => {
  chrome.storage.local.set({ links: [] });
  div.innerHTML = ''
});

// Add current tab button
document.getElementById("add-current").addEventListener("click", () => {

  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    // Getting tab url. Couldn't use document.location cuz that would add extension's url
    let url = tabs[0].url;
    elementMaker(url);

  });

});
