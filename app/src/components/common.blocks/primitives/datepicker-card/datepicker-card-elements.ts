type DatepickerCardElement = HTMLDivElement;

const datepickerCardElements = document.querySelectorAll('.js-datepicker-card') as NodeListOf<
  DatepickerCardElement
>;

export { datepickerCardElements as default, DatepickerCardElement };
