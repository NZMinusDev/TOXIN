import {
  dropdownsWithIQList,
  ToxinIQDropdownElement,
  ToxinIQDropdownDOM,
  ToxinIQDropdown,
  ToxinIQDropdownOpeningMethodModifier,
} from "../form-dropdown__item-quantity-list";

export type ToxinIQDropdownApplyOpeningMethoddDOM = ToxinIQDropdownDOM & {
  clearBtn: HTMLButtonElement;
  applyBtn: HTMLButtonElement;
};

export class ToxinIQDropdownApplyOpeningMethodModifier extends ToxinIQDropdownOpeningMethodModifier {
  constructor(toxinIQDropdown: ToxinIQDropdown) {
    const open = (event: MouseEvent) => {
      if (toxinIQDropdown.dom.openingButton.contains(event.target as Element)) {
        toxinIQDropdown.open();
      }
    };

    (toxinIQDropdown.dom as ToxinIQDropdownApplyOpeningMethodDOM).clearBtn = toxinIQDropdown.dom.menu.querySelector(
      ".apply-control__clear-btn"
    );
    (toxinIQDropdown.dom as ToxinIQDropdownApplyOpeningMethodDOM).applyBtn = toxinIQDropdown.dom.menu.querySelector(
      ".apply-control__apply-btn"
    );

    const clearHandler = (clickEvent: MouseEvent) => {
      toxinIQDropdown.dom.counters.forEach((counter, index) => {
        for (let i = parseInt(toxinIQDropdown.dom.counters.item(index).textContent); i > 0; i--) {
          toxinIQDropdown.dom.decrementBtns.item(index).dispatchEvent(new Event("click"));
        }
      });
    };

    const clearBtnVisibilityHandler = (clickEvent: MouseEvent) => {
      let totalItems = 0;
      toxinIQDropdown.dom.counters.forEach((counter) => {
        totalItems += parseInt(counter.textContent);
      });

      if (totalItems === 0) {
        (toxinIQDropdown.dom as ToxinIQDropdownApplyOpeningMethodDOM).clearBtn.classList.add(
          "apply-control__clear-btn_hidden"
        );
      } else {
        (toxinIQDropdown.dom as ToxinIQDropdownApplyOpeningMethodDOM).clearBtn.classList.remove(
          "apply-control__clear-btn_hidden"
        );
      }
    };

    const close = (clickEvent: MouseEvent) => {
      toxinIQDropdown.close();
    };

    super(toxinIQDropdown, [
      { currentTarget: toxinIQDropdown.dom.openingButton, eventType: "click", listener: open },
      {
        currentTarget: (toxinIQDropdown.dom as ToxinIQDropdownApplyOpeningMethodDOM).clearBtn,
        eventType: "click",
        listener: clearHandler,
      },
      {
        currentTarget: Array.from(toxinIQDropdown.dom.decrementBtns).concat(
          Array.from(toxinIQDropdown.dom.incrementBtns)
        ),
        eventType: "click",
        listener: clearBtnVisibilityHandler,
      },
      {
        currentTarget: (toxinIQDropdown.dom as ToxinIQDropdownApplyOpeningMethodDOM).applyBtn,
        eventType: "click",
        listener: close,
      },
    ]);

    //init clearBtn visibility
    clearBtnVisibilityHandler(null);
  }
  protected cancel() {
    super.cancel();

    (this.plugin.dom as ToxinIQDropdownApplyOpeningMethodDOM).clearBtn = null;
    (this.plugin.dom as ToxinIQDropdownApplyOpeningMethodDOM).applyBtn = null;
  }
}

dropdownsWithIQList.forEach((dropdown, index) => {
  if (
    (dropdown as ToxinIQDropdownElement).toxinIQDropdown.dom.openingButton.classList.contains(
      "form-dropdown__item-quantity-list_opening-method_apply"
    )
  ) {
    new ToxinIQDropdownApplyOpeningMethodModifier(
      (dropdown as ToxinIQDropdownElement).toxinIQDropdown as ToxinIQDropdown
    );
  }
});
