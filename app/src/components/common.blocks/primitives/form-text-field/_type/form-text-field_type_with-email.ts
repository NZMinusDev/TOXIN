import Inputmask from 'inputmask';

import formTextFieldElements from '../form-text-field';

const emailFormTextFields = formTextFieldElements.filter((formTextFieldElement) =>
  formTextFieldElement.closest('.form-text-field_type_with-email')
);

emailFormTextFields.forEach((emailFormTextField) => {
  Inputmask('email', { autoUnmask: true, showMaskOnHover: false }).mask(emailFormTextField);
});
