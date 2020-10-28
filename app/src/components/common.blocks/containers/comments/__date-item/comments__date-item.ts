import moment from 'moment';

document.addEventListener("DOMContentLoaded", () => {
  moment.locale("ru");

  document
    .querySelectorAll(".comments__date-item time")
    .forEach((dateHTMLItem: HTMLParagraphElement) => {
      dateHTMLItem.innerText = moment(dateHTMLItem.getAttribute("datetime")).fromNow();
    });
});
