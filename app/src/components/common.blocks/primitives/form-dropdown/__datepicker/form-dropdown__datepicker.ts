import { PluginCreation } from "@utils/devTools/devTools";

import { dropdowns } from "./../form-dropdown";
import {
  CardDatepickerElement,
  CardDatepickerDOM,
} from "@common.blocks/primitives/card-datepicker/card-datepicker";

export interface DatepickerDropdownElement extends HTMLDivElement {
  datepickerDropdown: DatepickerDropdown;
}

export type DatepickerDropdownDOM = {
  self: DatepickerDropdownElement;
  openingButton: HTMLButtonElement;
  selection: HTMLParagraphElement;
  cardDatepickerDOM: CardDatepickerDOM;
};
export interface DatepickerDropdownAPI extends PluginCreation.Plugin {
  readonly dom: DatepickerDropdownDOM;
}
export class DatepickerDropdown implements DatepickerDropdownAPI {
  readonly dom: DatepickerDropdownDOM = {
    self: null,
    openingButton: null,
    selection: null,
    cardDatepickerDOM: null,
  };

  constructor(datepickerDropdown: DatepickerDropdownElement) {
    this._initStaticDOM(datepickerDropdown);

    this._init();

    this._initOpenMod();
    this._initDisplayUpdate();

    datepickerDropdown.datepickerDropdown = this;
  }

  protected _initStaticDOM(datepickerDropdown: DatepickerDropdownElement) {
    this.dom.cardDatepickerDOM = (datepickerDropdown.querySelector(
      ".card-datepicker"
    ) as CardDatepickerElement).cardDatepicker.dom;

    this.dom.self = datepickerDropdown;
    this.dom.openingButton = this.dom.self.querySelector(".form-dropdown__datepicker-btn");
    this.dom.selection = this.dom.openingButton.querySelector(
      ".form-dropdown__selection-text time"
    );
  }
  protected _initOpenMod() {
    this.dom.cardDatepickerDOM.calendar.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    this.dom.openingButton.addEventListener("click", (event) => {
      this.dom.cardDatepickerDOM.calendar.classList.remove("form-dropdown__calendar_isHidden-js");
    });
    this.dom.cardDatepickerDOM.applyBtn.addEventListener("click", (event) => {
      this.dom.cardDatepickerDOM.calendar.classList.add("form-dropdown__calendar_isHidden-js");
    });
  }
  protected _initDisplayUpdate() {
    this.dom.cardDatepickerDOM.self.addEventListener("change", (event) => {
      this.dom.selection.textContent =
        this.dom.cardDatepickerDOM.self.cardDatepicker.lastFormattedDate ||
        this.dom.selection.getAttribute("placeholder");
      this.dom.selection.setAttribute(
        "datetime",
        this.dom.cardDatepickerDOM.input.value
      );

      this.dom.self.dispatchEvent(new CustomEvent("change"));
    });
  }

  private _init() {
    this.dom.selection.textContent =
      this.dom.cardDatepickerDOM.self.cardDatepicker.lastFormattedDate ||
      this.dom.selection.getAttribute("placeholder");
    this.dom.selection.setAttribute(
      "datetime",
      this.dom.cardDatepickerDOM.input.value
    );

    this.dom.cardDatepickerDOM.calendar.classList.add(
      "form-dropdown__calendar-js",
      "form-dropdown__calendar_isHidden-js"
    );
  }
}

// init and export our dropdowns
export const dropdownsWithDatepicker = Array.from(dropdowns).filter((dropdown) => {
  if (dropdown.querySelector(".form-dropdown__datepicker")) {
    $(function () {
      new DatepickerDropdown(dropdown as DatepickerDropdownElement);
    });
    return true;
  }
  return false;
});
