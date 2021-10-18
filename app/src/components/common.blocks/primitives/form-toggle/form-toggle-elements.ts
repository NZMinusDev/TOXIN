type FormToggleElement = HTMLDivElement;

const formToggleElements =
  document.querySelectorAll<FormToggleElement>('.js-form-toggle');

export { formToggleElements as default, FormToggleElement };
