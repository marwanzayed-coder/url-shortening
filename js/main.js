// API: https://api.shrtco.de/v2/shorten?url=(Link)

let btn = document.getElementById("shorten"),
  input = document.getElementById("input"),
  result = document.getElementById("result"),
  error = document.querySelector(".shortly p"),
  btnCopy = document.querySelector(".result .link button"),
  bars = document.getElementById("bars"),
  links = document.getElementById("links");

bars.onclick = function () {
  bars.classList.toggle("open");
  if (bars.classList.contains("open") === true) {
    links.style.cssText = "z-index: 55555; opacity: 1; visibility: visible;";
  } else {
    links.style.cssText = "z-index: -5; opacity: 0; visibility: hidden;";
  }
};
btn.onclick = function () {
  shorten();
};

function shorten() {
  if (input.value == "") {
    input.style.border = "hsl(0, 87%, 67%) 2px solid";
    error.style.display = "block";
  } else {
    fetch(`https://api.shrtco.de/v2/shorten?url=${input.value}`)
      .then((response) => response.json())
      .then((data) => {
        let linkDiv = document.createElement("div"),
          link = document.createElement("span"),
          linkText = document.createTextNode(data.result.original_link),
          span = document.createElement("span"),
          shortLink = document.createElement("span"),
          shortLinkText = document.createTextNode(data.result.full_short_link2),
          copy = document.createElement("button"),
          copyText = document.createTextNode("Copy");
        linkDiv.className = "link";
        shortLink.appendChild(shortLinkText);
        span.appendChild(shortLink);
        span.appendChild(copy);

        shortLink.style.color = "var(--color-cyan)";

        copy.onclick = function () {
          /* Copy the text inside the text field */
          navigator.clipboard.writeText(data.result.full_short_link2);
          copy.innerHTML = "Copied!";
          copy.classList.add("copied");
        };

        copy.appendChild(copyText);

        link.appendChild(linkText);

        linkDiv.appendChild(link);
        linkDiv.appendChild(span);
        result.appendChild(linkDiv);
      });
  }
}
