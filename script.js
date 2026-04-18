const button = document.getElementById("testButton");
const message = document.getElementById("testMessage");

if (button && message) {
  button.addEventListener("click", () => {
    message.textContent = "JavaScript is working. Your GitHub Pages site is live and loading assets correctly.";
  });
}
