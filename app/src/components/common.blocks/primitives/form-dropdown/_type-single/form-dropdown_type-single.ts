import {
  BASIC_IQDROPDOWN_OPTIONS,
  getDropdownElements,
  initDropdowns,
} from "./../__item-quantity-list/form-dropdown__item-quantity-list";

export const initDropdownSingle = (
  targetSelector = ".form-dropdown_type-single .iqdropdown",
  additionalBehavior = () => {}
) => {
  /**
   * Init lib component
   */
  $(function () {
    const dropdowns = $(targetSelector);
    if (dropdowns.length > 0) {
      const dropdownElements = getDropdownElements(dropdowns);

      BASIC_IQDROPDOWN_OPTIONS.setSelectionText = (itemCount, totalItems) => {
        let result = "";

        result =
          totalItems > 1
            ? totalItems + " " + dropdownElements[0].data("text-plural")
            : totalItems === 1
            ? totalItems + " " + dropdownElements[0].data("selection-text")
            : dropdownElements[0].data("placeholder");

        return result;
      };

      initDropdowns(targetSelector, BASIC_IQDROPDOWN_OPTIONS);

      additionalBehavior();
    }
  });
};
initDropdownSingle();
