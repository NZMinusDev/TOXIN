type FormDropdownElement = HTMLDivElement;

const formDropdownElements = document.querySelectorAll('.js-form-dropdown') as NodeListOf<
  FormDropdownElement
>;

export { formDropdownElements as default, FormDropdownElement };
