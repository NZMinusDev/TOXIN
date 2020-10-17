import Inputmask from "inputmask";

const emailFormTextFields = document.querySelectorAll(
  ".form-text-field_isEmail .form-field"
);

emailFormTextFields.forEach((emailFormTextField) => {
  Inputmask("email", { autoUnmask: true, showMaskOnHover: false }).mask(emailFormTextField);
});
