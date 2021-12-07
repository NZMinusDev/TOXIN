type DatepickerCardElement = HTMLDivElement;

const datepickerCardElements = document.querySelectorAll<DatepickerCardElement>(
  '.js-datepicker-card'
);

export { datepickerCardElements as default, DatepickerCardElement };
