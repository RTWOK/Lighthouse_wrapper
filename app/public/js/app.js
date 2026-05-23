// assets/js/Main.js
var form = document.querySelector("[data-audit-form]");
console.log("hello world!");
if (form) {
  form.addEventListener("submit", () => {
    form.classList.add("is-loading");
  });
}
