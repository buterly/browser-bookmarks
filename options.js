div = document.getElementById("div1");

// Get links and create iframe for each
chrome.storage.local.get('links', (result) => {

  link_list = result.links

  link_list.forEach((element) => {
    br = document.createElement("br")
    span = document.createElement("div")
    let iframe1 = document.createElement("iframe");
    let link = document.createElement("a")
    link.href = element;
    link.innerText = "Link"
    iframe1.width = 900;
    iframe1.height = 600;
    iframe1.loading = "lazy"

    var h = element.replace("watch?v=", "embed/");
    if (h.includes("&t")) {
      h = h.split("&t")[0]
    }
    iframe1.src = h;


    span.appendChild(iframe1);
    span.appendChild(br)
    span.appendChild(link)
    div.appendChild(span)
  });
});
