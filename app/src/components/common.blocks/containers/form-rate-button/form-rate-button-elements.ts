type FormRateButtonElement = HTMLDivElement;

const formRateButtonElements = document.querySelectorAll<FormRateButtonElement>(
  '.js-form-rate-button'
);

export { formRateButtonElements as default, FormRateButtonElement };
