// assets/js/main.js
var form = document.querySelector("[data-audit-form]");
if (form) {
  form.addEventListener("submit", () => {
    form.classList.add("is-loading");
  });
}
