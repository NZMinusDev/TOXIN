import "./sign-in.pug";
import "./sign-in.scss";

document.querySelectorAll(".sign-in-layout__card .card-base").forEach((cardElement, key, nodeList) => {
  let switchBtn = cardElement.querySelector(
    `.${cardElement.getAttribute("name")}__switch-btn`
  );

  switchBtn.addEventListener("click", () => {
    nodeList.forEach((cardElement) => {
      cardElement.parentElement.classList.toggle("sign-in-layout__card_hidden");
    });
  });
});
