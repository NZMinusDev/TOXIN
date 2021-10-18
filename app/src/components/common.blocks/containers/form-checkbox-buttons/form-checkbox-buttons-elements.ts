type FormCheckboxButtonsElement = HTMLDivElement;

const formCheckboxButtonsElements =
  document.querySelectorAll<FormCheckboxButtonsElement>(
    '.js-form-checkbox-buttons'
  );

export { formCheckboxButtonsElements as default, FormCheckboxButtonsElement };
