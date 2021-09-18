type FormTextFieldElement = HTMLDivElement;

const formTextFieldElements =
  document.querySelectorAll<FormTextFieldElement>('.js-form-text-field');

export { formTextFieldElements as default, FormTextFieldElement };
