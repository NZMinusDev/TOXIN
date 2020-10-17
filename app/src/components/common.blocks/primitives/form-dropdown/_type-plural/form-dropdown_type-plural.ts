import {
  BASIC_IQDROPDOWN_OPTIONS,
  initDropdowns,
} from "./../__item-quantity-list/form-dropdown__item-quantity-list";

$(function () {
  BASIC_IQDROPDOWN_OPTIONS.setSelectionText = (itemCount: Object, totalItems) => {
    let result = "";
    if (totalItems > 0) {
      for (const key in itemCount) {
        if (itemCount[key] > 0) {
          if (result !== "") result += ", ";
          result += itemCount[key] + " " + key;
        }
      }
    } else {
      result = "";
    }

    return result;
  };

  initDropdowns(".form-dropdown_type-plural .iqdropdown", BASIC_IQDROPDOWN_OPTIONS);
});
