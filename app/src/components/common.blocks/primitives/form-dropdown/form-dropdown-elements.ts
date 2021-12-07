type FormDropdownElement = HTMLDivElement;

const formDropdownElements =
  document.querySelectorAll<FormDropdownElement>('.js-form-dropdown');

export { formDropdownElements as default, FormDropdownElement };
