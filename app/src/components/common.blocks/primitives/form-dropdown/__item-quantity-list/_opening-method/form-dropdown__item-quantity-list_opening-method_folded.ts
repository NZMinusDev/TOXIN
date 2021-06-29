import {
  ToxinIQDropdown,
  ToxinIQDropdownElement,
  ToxinIQDropdownOpeningMethodModifier,
  dropdownsWithIQList,
} from "../form-dropdown__item-quantity-list";

export class ToxinIQDropdownFoldOpeningMethodModifier extends ToxinIQDropdownOpeningMethodModifier {
  constructor(toxinIQDropdown: ToxinIQDropdown) {
    const foldMenuHandler = (event: MouseEvent) => {
      if (toxinIQDropdown.dom.openingButton.contains(event.target as Element)) {
        toxinIQDropdown.open();
      } else {
        toxinIQDropdown.close();
      }
    };

    super(toxinIQDropdown, [
      {
        currentTarget: (document as unknown) as HTMLElement,
        eventType: "mouseup",
        listener: foldMenuHandler,
      },
    ]);
  }
}

dropdownsWithIQList.forEach((dropdown, index) => {
  if (
    (dropdown as ToxinIQDropdownElement).toxinIQDropdown.dom.openingButton.classList.contains(
      "form-dropdown__item-quantity-list_opening-method_folded"
    )
  ) {
    new ToxinIQDropdownFoldOpeningMethodModifier(
      (dropdown as ToxinIQDropdownElement).toxinIQDropdown as ToxinIQDropdown
    );
  }
});
