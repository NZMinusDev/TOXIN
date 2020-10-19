import Inputmask from "inputmask";

const dateFormTextFields = document.querySelectorAll(
  ".form-text-field_isDate .form-text-field__input"
);
dateFormTextFields.forEach((dateFormTextField) => {
  Inputmask("datetime", {
    inputFormat: "dd.mm.yyyy",
    placeholder: "ДД.ММ.ГГГГ",
    autoUnmask: true,
    showMaskOnHover: false,
  }).mask(dateFormTextField);
});
