import Inputmask from 'inputmask';

import formTextFieldElements from '../form-text-field';

const dateFormTextFields = formTextFieldElements.filter((formTextFieldElement) =>
  formTextFieldElement.closest('.form-text-field_type_with-date')
);

dateFormTextFields.forEach((dateFormTextField) => {
  Inputmask('datetime', {
    inputFormat: 'dd.mm.yyyy',
    placeholder: dateFormTextField.dataset.placeholder,
    autoUnmask: true,
    showMaskOnHover: false,
  }).mask(dateFormTextField);
});
