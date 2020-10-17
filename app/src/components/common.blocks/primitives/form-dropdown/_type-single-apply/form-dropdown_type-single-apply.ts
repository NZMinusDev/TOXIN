import { getDropdownElements } from "./../__item-quantity-list/form-dropdown__item-quantity-list";
import { initDropdownSingle } from "./../_type-single/form-dropdown_type-single";

const TARGET_SELECTOR = ".form-dropdown_type-single-apply .iqdropdown";

initDropdownSingle(TARGET_SELECTOR, () => {
  const dropdowns = $(TARGET_SELECTOR);
  const dropdownMenus = getDropdownElements(dropdowns)[1];

  const clearHandler = (jqEvent: JQuery.ClickEvent) => {
    jqEvent.stopPropagation();
    const targetMenu = dropdownMenus.has(jqEvent.target);
    targetMenu.find(".button-decrement").each((index, btn) => {
      for (let i = parseInt(targetMenu.find(".counter")[index].innerText); i > 0; i--) {
        btn.dispatchEvent(new Event("click"));
      }
    });
  };
  dropdownMenus.find(".form-dropdown__clear-btn-js").on("click", clearHandler);

  const clearBtnVisibilityHandler = (jqEvent: JQuery.ClickEvent) => {
      const targetMenu = dropdownMenus.has(jqEvent.target);
      const targetClearBtn = targetMenu.find(".form-dropdown__clear-btn-js");
      let totalItems = 0;

      targetMenu.find(".counter").each((index, counter) => {
        totalItems += parseInt(counter.innerText);
      });

      if (totalItems < 1) {
        targetClearBtn.addClass("form-dropdown__clear-btn-js_isHidden");
      } else {
        targetClearBtn.removeClass("form-dropdown__clear-btn-js_isHidden");
      }
  };
  dropdownMenus.find(".form-dropdown__clear-btn-js").on("click", clearBtnVisibilityHandler);
  dropdownMenus.find(".button-decrement").on("click", clearBtnVisibilityHandler);
  dropdownMenus.find(".button-increment").on("click", clearBtnVisibilityHandler);
  dropdowns.each((index, dropdown) => {
    const jqEvent = { target: $(dropdown).find(".button-decrement")[0] };
    clearBtnVisibilityHandler(jqEvent as JQuery.ClickEvent);
  });
});
