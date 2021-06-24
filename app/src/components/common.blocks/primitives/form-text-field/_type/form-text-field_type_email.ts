import Inputmask from "inputmask";

const emailFormTextFields = document.querySelectorAll(
  ".form-text-field_type_email .form-text-field__input"
);

emailFormTextFields.forEach((emailFormTextField) => {
  Inputmask("email", { autoUnmask: true, showMaskOnHover: false }).mask(emailFormTextField);
});
