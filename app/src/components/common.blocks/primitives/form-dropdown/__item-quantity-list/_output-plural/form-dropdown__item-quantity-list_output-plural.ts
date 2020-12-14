import {
  ToxinIQDropdownElement,
  dropdownsWithIQList,
} from "./../form-dropdown__item-quantity-list";

dropdownsWithIQList.forEach((dropdown) => {
  if (
    (dropdown as ToxinIQDropdownElement).toxinIQDropdown.dom.openingButton.classList.contains(
      "form-dropdown__item-quantity-list_output-plural"
    )
  ) {
    (dropdown as ToxinIQDropdownElement).toxinIQDropdown.dom.openingButton.setSelectionText = (
      itemCount: Object,
      totalItems
    ) => {
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

    //init display
    (dropdown as ToxinIQDropdownElement).toxinIQDropdown.dom.selection.textContent = (dropdown as ToxinIQDropdownElement).toxinIQDropdown.dom.openingButton.setSelectionText(
      (dropdown as ToxinIQDropdownElement).toxinIQDropdown.lastChangedItem,
      (dropdown as ToxinIQDropdownElement).toxinIQDropdown.totalItems
    );
  }
});
