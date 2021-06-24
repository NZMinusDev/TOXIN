import {
  ToxinIQDropdown,
  ToxinIQDropdownElement,
  ToxinIQDropdownOpeningMethodModifier,
  dropdownsWithIQList,
} from "../form-dropdown__item-quantity-list";

export class ToxinIQDropdownToggleOpeningMethodModifier extends ToxinIQDropdownOpeningMethodModifier {
  constructor(toxinIQDropdown: ToxinIQDropdown) {
    const toggleMenuHandler = (event) => {
      toxinIQDropdown.toggle();
    };

    super(toxinIQDropdown, [
      {
        currentTarget: toxinIQDropdown.dom.openingButton,
        eventType: "click",
        listener: toggleMenuHandler,
      },
    ]);
  }
}

dropdownsWithIQList.forEach((dropdown, index) => {
  if (
    (dropdown as ToxinIQDropdownElement).toxinIQDropdown.dom.openingButton.classList.contains(
      "form-dropdown__item-quantity-list_opening-method_toggle"
    )
  ) {
    new ToxinIQDropdownToggleOpeningMethodModifier(
      (dropdown as ToxinIQDropdownElement).toxinIQDropdown as ToxinIQDropdown
    );
  }
});
