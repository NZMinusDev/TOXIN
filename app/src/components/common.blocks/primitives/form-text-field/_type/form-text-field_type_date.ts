import Inputmask from "inputmask";

const dateFormTextFields = document.querySelectorAll(
  ".form-text-field_type_date .form-text-field__input"
);
dateFormTextFields.forEach((dateFormTextField) => {
  dateFormTextField.setAttribute("inputmode", "numeric");
  Inputmask("datetime", {
    inputFormat: "dd.mm.yyyy",
    placeholder: dateFormTextField.dataset.placeholder,
    autoUnmask: true,
    showMaskOnHover: false,
  }).mask(dateFormTextField);
});
