import {
  ToxinIQDropdownElement,
  dropdownsWithIQList,
} from "./../form-dropdown__item-quantity-list";

dropdownsWithIQList.forEach((dropdown) => {
  if (
    (dropdown as ToxinIQDropdownElement).toxinIQDropdown.dom.openingButton.classList.contains(
      "form-dropdown__item-quantity-list_output-single"
    )
  ) {
    (dropdown as ToxinIQDropdownElement).toxinIQDropdown.dom.openingButton.setSelectionText = (
      itemCount,
      totalItems
    ) => {
      let result = "";

      result =
        totalItems > 1
          ? totalItems +
            " " +
            (dropdown as ToxinIQDropdownElement).toxinIQDropdown.dom.selection.dataset.textPlural
          : totalItems === 1
          ? totalItems +
            " " +
            (dropdown as ToxinIQDropdownElement).toxinIQDropdown.dom.selection.dataset.selectionText
          : (dropdown as ToxinIQDropdownElement).toxinIQDropdown.dom.selection.dataset.placeholder;

      return result;
    };

    //init display
    (dropdown as ToxinIQDropdownElement).toxinIQDropdown.dom.selection.textContent = (dropdown as ToxinIQDropdownElement).toxinIQDropdown.dom.openingButton.setSelectionText(
      (dropdown as ToxinIQDropdownElement).toxinIQDropdown.lastChangedItem,
      (dropdown as ToxinIQDropdownElement).toxinIQDropdown.totalItems
    );
  }
});
