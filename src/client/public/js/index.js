const btnDownload = document.querySelector("#btnDownload");
const container = document.querySelector(".container");
const style = document.querySelector("style");
const form = document.querySelector("form");
const fileName = document.querySelector("#fileName");
const styleTag = document.querySelector("#styleTag");

if (form) {
  form.addEventListener("submit", (ev) => {
    const strHtmlTag = container.outerHTML;
    fileName.value = "test-file";
    htmlTag.value = strHtmlTag;
    styleTag.value = getStylesheetText();
    // ev.preventDefault();
  });
}

/**
 * stylesheet의 text를 가져온다.
 */
function getStylesheetText() {
  const resultCss = [];
  const styleSheets = document.styleSheets;
  if (styleSheets.length > 0) {
    for (let i = 0, len = styleSheets[0].cssRules.length; i < len; i++) {
      resultCss.push(styleSheets[0].cssRules[i].cssText);
    }
  }
  return resultCss.join("");
}
