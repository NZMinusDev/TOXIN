document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".form-like-button__button-item").forEach((btn) => {
    btn.addEventListener("change", (event) => {
      const target = event.target as HTMLInputElement;
      console.log(target.checked);
      target.dataset.counter = target.checked
        ? parseInt(target.dataset.counter) + 1 + ""
        : parseInt(target.dataset.counter) - 1 + "";
    });
  });
});
