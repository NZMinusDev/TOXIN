import Inputmask from "inputmask";

const emailFormTextFields = document.querySelectorAll(
  ".form-text-field_type_with-email .form-text-field__input"
);

emailFormTextFields.forEach((emailFormTextField) => {
  Inputmask("email", { autoUnmask: true, showMaskOnHover: false }).mask(emailFormTextField);
});
