import Inputmask from "inputmask";

const dateFormTextFields = document.querySelectorAll(
  ".form-text-field_isDate .form-text-field__field"
);
dateFormTextFields.forEach((dateFormTextField) => {
  Inputmask("datetime", {
    inputFormat: "dd.mm.yyyy",
    placeholder: "ДД.ММ.ГГГГ",
    autoUnmask: true,
    showMaskOnHover: false,
  }).mask(dateFormTextField);
});
