type FormExpandableCheckboxListElement = HTMLDivElement;

const formExpandableCheckboxListElements =
  document.querySelectorAll<FormExpandableCheckboxListElement>('.js-form-expandable-checkbox-list');

export { formExpandableCheckboxListElements as default, FormExpandableCheckboxListElement };
