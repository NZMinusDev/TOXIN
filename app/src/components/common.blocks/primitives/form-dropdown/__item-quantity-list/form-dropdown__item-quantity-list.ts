interface IQDropdownOptions {
  // max total items
  maxItems?: number;
  // min total items
  minItems?: number;
  // text to show on the dropdown override data-selection-text attribute
  selectionText?: string;
  // text to show for multiple items
  textPlural?: string;
  // optionally can use setSelectionText function to override selectionText
  setSelectionText?: (itemCount: Object, totalItems) => {};
  // buttons to increment/decrement
  controls?: {
    position: string;
    displayCls: string;
    controlsCls: string;
    counterCls: string;
  };
  // fires when an item quantity changes
  onChange?: (id, count, totalItems) => {};
  // return false to prevent an item decrement
  beforeDecrement?: (id, itemCount) => {};
  // return false to prevent an item increment
  beforeIncrement?: (id, itemCount) => {};
}

export const getDropdownElements = (dropdowns: JQuery<HTMLElement>) => {
  const allSelections = dropdowns.find(".iqdropdown-selection");
  const allMenus = dropdowns.find(".iqdropdown-menu");

  return [allSelections, allMenus];
};

export const BASIC_IQDROPDOWN_OPTIONS: IQDropdownOptions = {
  controls: {
    position: "right",
    displayCls: "iqdropdown-content",
    controlsCls: "form-dropdown__counter-control",
    counterCls: "counter",
  },
};

export function initDropdowns(targetSelector: string, options: IQDropdownOptions) {
  // Init lib component
  $(targetSelector).iqDropdown(options);

  const decrementBtns = $(".iqdropdown .button-decrement");
  const incrementBtns = $(".iqdropdown .button-increment");

  //disable counterBtn
  const counterBtnsVisibilityHandler = (jqEvent: JQuery.ClickEvent) => {
    const targetMenuOption = $(".iqdropdown .iqdropdown-menu-option").has(jqEvent.target);
    const decrementBtn = targetMenuOption.find(".button-decrement");
    const incrementBtn = targetMenuOption.find(".button-increment");
    const counter = targetMenuOption.find(".counter");

    if (parseInt(targetMenuOption.attr("data-mincount")) === parseInt(counter.text())) {
      decrementBtn.addClass("iqdropdown__counter_isDisabled");
    } else {
      decrementBtn.removeClass("iqdropdown__counter_isDisabled");
    }
    if (parseInt(targetMenuOption.attr("data-maxcount")) === parseInt(counter.text())) {
      incrementBtn.addClass("iqdropdown__counter_isDisabled");
    } else {
      incrementBtn.removeClass("iqdropdown__counter_isDisabled");
    }
  };
  decrementBtns.on("click", counterBtnsVisibilityHandler);
  incrementBtns.on("click", counterBtnsVisibilityHandler);

  //remove button value to input value
  const changeInputValueHandler = (jqEvent: JQuery.ClickEvent) => {
    const targetDropdownSwitcher = $(".iqdropdown").has(jqEvent.target);

    $(targetDropdownSwitcher).find(".iqdropdown-selection").text().match(/[0-9]/)
      ? $(targetDropdownSwitcher)
          .prev(".form-dropdown__input")
          .val($(targetDropdownSwitcher).find(".iqdropdown-selection").text())
      : $(targetDropdownSwitcher).prev(".form-dropdown__input").val("");
  };
  decrementBtns.on("click", changeInputValueHandler);
  incrementBtns.on("click", changeInputValueHandler);

  decrementBtns.each((index, btn) => {
    const jqEvent = { target: btn };
    counterBtnsVisibilityHandler(jqEvent as JQuery.ClickEvent);
    changeInputValueHandler(jqEvent as JQuery.ClickEvent);
  });
  incrementBtns.each((index, btn) => {
    const jqEvent = { target: btn };
    counterBtnsVisibilityHandler(jqEvent as JQuery.ClickEvent);
    changeInputValueHandler(jqEvent as JQuery.ClickEvent);
  });
}

const closeListHandler = (event) => {
  const dropdowns = $(".form-dropdown_type-single .iqdropdown").add($(".form-dropdown_type-plural .iqdropdown"));
  const currentDropdown = dropdowns.has(event.target);

  if (currentDropdown.length >= 0) {
    dropdowns.each((index, dropdown) => {
      if (currentDropdown.get(0) !== dropdown) dropdown.classList.remove("menu-open");
    });
  }
};
$(document).on("mouseup", closeListHandler);
