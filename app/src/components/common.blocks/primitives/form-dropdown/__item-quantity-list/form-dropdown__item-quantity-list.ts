import { pluralize } from 'numeralize-ru';

import BEMComponent, {
  HTMLElementWithComponent,
} from '@shared/utils/scripts/components/BEM/BEMComponent';
import { has } from '@shared/utils/scripts/DOM';
import { Unpacked } from '@shared/utils/scripts/types/utility';
import { addURLValues } from '@shared/utils/scripts/URL';
import '@library.blocks/primitives/form-dropdown/__item-quantity-list/form-dropdown__item-quantity-list';

import formDropdownElements from '../form-dropdown-elements';
import type { ExpandableItemCustomEvents } from '../form-dropdown';

type FormDropdownItemQuantityListElement = HTMLDivElement;
type LibElement = HTMLDivElement;

type FormDropdownItemQuantityListDOM = {
  $libElement: JQuery<LibElement>;
  listInput: HTMLInputElement;
  selection: HTMLParagraphElement;
  menu: HTMLDivElement;
  optionInputs: HTMLInputElement[];
  menuOptions: HTMLDivElement[];
};
type FormDropdownItemQuantityListGeneratedDOM = {
  decrementButtons: HTMLButtonElement[];
  incrementButtons: HTMLButtonElement[];
};

type FormDropdownItemQuantityListHTMLOptions = {
  selection: { placeholder: string };
  menu: {
    groups: { [groupName: string]: { one: string; two: string; five: string } };
  };
  menuOptions: Map<
    HTMLDivElement,
    {
      id: string;
      defaultCount: number;
      minCount: number;
      maxCount: number;
      group: string;
    }
  >;
  isFilter: boolean;
};
type FormDropdownItemQuantityListState = {
  totalItems: number;
  itemsCounter: Map<string, number>;
  groupsCounter: Map<string, number>;
};

type FormDropdownItemQuantityListCustomEvents = {
  select: {};
  change: {};
} & ExpandableItemCustomEvents;

class FormDropdownItemQuantityList extends BEMComponent<
  FormDropdownItemQuantityListElement,
  FormDropdownItemQuantityListCustomEvents
> {
  protected readonly _DOM: Readonly<FormDropdownItemQuantityListDOM>;

  protected readonly _generatedDOM: Readonly<FormDropdownItemQuantityListGeneratedDOM>;

  protected readonly _options: FormDropdownItemQuantityListHTMLOptions;

  protected readonly _state: FormDropdownItemQuantityListState;

  constructor(
    formDropdownItemQuantityListElement: FormDropdownItemQuantityListElement
  ) {
    super(formDropdownItemQuantityListElement);

    this._DOM = this._initDOM();
    this._state = FormDropdownItemQuantityList._initState();
    this._options = this._initOptionsFromHTML();
    this._generatedDOM =
      this._initLibFormDropdownItemQuantityList()._initGeneratedDOM();

    this._bindListInputListeners()._bindCounterBtnListeners()._bindListeners();

    this._initDisplay();
  }

  getTotalItems() {
    return this._state.totalItems;
  }

  reset() {
    this._DOM.menuOptions.forEach((menuOption, index) => {
      const menuOptionOptions = this._options.menuOptions.get(menuOption);

      if (menuOptionOptions !== undefined) {
        const currAmount = this._state.itemsCounter.get(menuOptionOptions.id);

        if (currAmount !== undefined) {
          const minAmount = menuOptionOptions.minCount;
          let amountToDecrement = currAmount - minAmount;

          const decrementBtn = this._generatedDOM.decrementButtons[index];

          while (amountToDecrement !== 0) {
            decrementBtn.dispatchEvent(new Event('click'));
            amountToDecrement -= 1;
          }
        }
      }
    });

    return this;
  }

  open() {
    this._DOM.$libElement.addClass('menu-open');

    this.element.dispatchEvent(new CustomEvent('open', { bubbles: true }));

    return this;
  }

  close() {
    this._DOM.$libElement.removeClass('menu-open');

    this.element.dispatchEvent(new CustomEvent('close', { bubbles: true }));

    return this;
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }

    return this;
  }

  isOpen() {
    return this._DOM.$libElement.hasClass('menu-open');
  }

  protected _initDOM() {
    const libElement = this.element.querySelector(
      '.js-iqdropdown'
    ) as LibElement;
    const $libElement = $(
      libElement
    ) as FormDropdownItemQuantityListDOM['$libElement'];
    const listInput = this.element.querySelector(
      '.js-form-dropdown__list-input'
    ) as FormDropdownItemQuantityListDOM['listInput'];
    const selection = this.element.querySelector(
      '.js-iqdropdown-selection'
    ) as FormDropdownItemQuantityListDOM['selection'];
    const menu = this.element.querySelector(
      '.js-iqdropdown-menu'
    ) as FormDropdownItemQuantityListDOM['menu'];
    const optionInputs = [
      ...menu.querySelectorAll('.js-form-dropdown__option-input'),
    ] as FormDropdownItemQuantityListDOM['optionInputs'];
    const menuOptions = [
      ...menu.querySelectorAll('.js-iqdropdown-menu-option'),
    ] as FormDropdownItemQuantityListDOM['menuOptions'];

    return {
      $libElement,
      listInput,
      selection,
      menu,
      optionInputs,
      menuOptions,
    };
  }

  protected _initOptionsFromHTML() {
    const values = this._DOM.listInput.value.split(',');

    return {
      selection: { placeholder: this._DOM.selection.dataset.placeholder || '' },
      menu: {
        groups:
          this._DOM.menu.dataset.groups !== undefined
            ? JSON.parse(this._DOM.menu.dataset.groups)
            : '',
      },
      menuOptions: new Map(
        this._DOM.menuOptions.map((menuOption, index) => {
          const menuOptionRef = menuOption;
          menuOptionRef.dataset.defaultcount =
            values[index] ?? menuOption.dataset.defaultcount;

          return [
            menuOption,
            {
              id: menuOption.dataset.id || '',
              defaultCount: Number(menuOption.dataset.defaultcount),
              minCount: Number(menuOption.dataset.mincount),
              maxCount: Number(menuOption.dataset.maxcount),
              group: menuOption.dataset.group || '',
            },
          ];
        })
      ),
      isFilter: this._DOM.listInput.dataset.isFilter !== undefined,
    };
  }

  private _initLibFormDropdownItemQuantityList() {
    this._DOM.$libElement.iqDropdown({
      setSelectionText: (itemCount, totalItems) => {
        this._state.totalItems = totalItems;
        this._updateCounters(itemCount);

        return this._generateResultText();
      },
      controls: {
        position: 'right',
        displayCls: 'iqdropdown-content',
        controlsCls: 'form-dropdown__counter-control',
        counterCls: 'counter',
      },
    });

    // disable menu toggling by lib
    this._DOM.$libElement.off('click');

    return this;
  }

  protected _initGeneratedDOM() {
    const decrementButtons = [
      ...this._DOM.menu.querySelectorAll('.button-decrement'),
    ] as FormDropdownItemQuantityListGeneratedDOM['decrementButtons'];
    const incrementButtons = [
      ...this._DOM.menu.querySelectorAll('.button-increment'),
    ] as FormDropdownItemQuantityListGeneratedDOM['incrementButtons'];

    return {
      decrementButtons,
      incrementButtons,
    };
  }

  protected static _initState() {
    const totalItems = -1;
    const itemsCounter = new Map<string, number>();
    const groupsCounter = new Map<string, number>();

    return { totalItems, itemsCounter, groupsCounter };
  }

  protected _bindListInputListeners() {
    const { listInput } = this._DOM;

    listInput.addEventListener(
      'change',
      this._listInputEventListenerObject.handleListInputChange
    );

    return this;
  }

  protected _listInputEventListenerObject = {
    handleListInputChange: (event: Event) => {
      const { currentTarget } = event;

      if (currentTarget instanceof HTMLInputElement && this._options.isFilter) {
        addURLValues({ name: currentTarget.name, value: currentTarget.value });
      }
    },
  };

  protected _bindCounterBtnListeners() {
    this._generatedDOM.incrementButtons.forEach((incrementBtn) => {
      incrementBtn.addEventListener(
        'click',
        this._counterButtonEventListenerObject.handleCounterButtonClick
      );
    });
    this._generatedDOM.decrementButtons.forEach((decrementBtn) => {
      decrementBtn.addEventListener(
        'click',
        this._counterButtonEventListenerObject.handleCounterButtonClick
      );
    });

    return this;
  }

  protected _counterButtonEventListenerObject = {
    handleCounterButtonClick: (clickEvent: MouseEvent) => {
      const { currentTarget } = clickEvent;

      if (currentTarget instanceof HTMLElement) {
        const targetMenuOption = has(this._DOM.menuOptions, currentTarget);

        if (targetMenuOption instanceof HTMLDivElement) {
          this._updateCounterButtonDisplay(targetMenuOption);

          this.element.dispatchEvent(
            new CustomEvent('select', { bubbles: true })
          );
        }
      }
    },
  };

  protected _bindListeners() {
    this.element.addEventListener('close', this.onClose);

    return this;
  }

  protected onClose = () => {
    this._changeValueOfInputs();
  };

  protected _initDisplay() {
    this._DOM.menuOptions.forEach((menuOption) => {
      this._updateCounterButtonDisplay(menuOption);
    });

    return this;
  }

  protected _generateResultText() {
    const { groups } = this._options.menu;
    let result = '';

    if (this._state.totalItems > 0) {
      this._state.groupsCounter.forEach((groupAmount, groupKey) => {
        if (groupAmount > 0) {
          if (result !== '') {
            result += ', ';
          }

          // pluralize
          const appendedText = pluralize(
            groupAmount,
            groups[groupKey].one,
            groups[groupKey].two,
            groups[groupKey].five
          );

          result += `${groupAmount} ${appendedText}`;
        }
      });
    } else {
      result = this._options.selection.placeholder;
    }

    return result;
  }

  protected _updateCounters(itemCount: { [itemID: string]: number }) {
    this._state.itemsCounter.clear();
    this._state.groupsCounter.clear();

    this._DOM.menuOptions.forEach((menuOption) => {
      const menuOptionOptions = this._options.menuOptions.get(menuOption);

      if (menuOptionOptions !== undefined) {
        this._state.itemsCounter.set(
          menuOptionOptions.id,
          itemCount[menuOptionOptions.id]
        );
        this._state.groupsCounter.set(
          menuOptionOptions.group,
          (this._state.groupsCounter.get(menuOptionOptions.group) || 0) +
            itemCount[menuOptionOptions.id]
        );
      }
    });

    return this;
  }

  protected _changeValueOfInputs() {
    let accumulator = '';
    this._DOM.menuOptions.forEach((menuOption, index) => {
      const menuOptionOptions = this._options.menuOptions.get(menuOption);

      if (menuOptionOptions !== undefined) {
        const itemAmount = this._state.itemsCounter.get(menuOptionOptions.id);
        const input = this._DOM.optionInputs[index];

        input.value = `${itemAmount}`;

        if (index > 0) {
          accumulator += ',';
        }

        accumulator += itemAmount;
      }
    });

    this._DOM.listInput.value = accumulator;

    this._DOM.listInput.dispatchEvent(new Event('change'));
    this.element.dispatchEvent(new CustomEvent('change', { bubbles: true }));

    return this;
  }

  protected _updateCounterButtonDisplay(
    targetMenuOption: Unpacked<FormDropdownItemQuantityListDOM['menuOptions']>
  ) {
    const targetMenuOptionOptions =
      this._options.menuOptions.get(targetMenuOption);

    if (targetMenuOptionOptions !== undefined) {
      const menuOptionIndex = this._DOM.menuOptions.indexOf(targetMenuOption);
      const decrementBtn = this._generatedDOM.decrementButtons[menuOptionIndex];
      const incrementBtn = this._generatedDOM.incrementButtons[menuOptionIndex];

      const itemAmount = this._state.itemsCounter.get(
        targetMenuOptionOptions.id
      );

      if (targetMenuOptionOptions.minCount === itemAmount) {
        decrementBtn.disabled = true;
      } else {
        decrementBtn.disabled = false;
      }

      if (targetMenuOptionOptions.maxCount === itemAmount) {
        incrementBtn.disabled = true;
      } else {
        incrementBtn.disabled = false;
      }
    }

    return this;
  }
}

type FormDropdownItemQuantityListElementWithComponent =
  HTMLElementWithComponent<
    FormDropdownItemQuantityListElement,
    FormDropdownItemQuantityListCustomEvents,
    FormDropdownItemQuantityList
  >;

const formDropdownItemQuantityLists = Array.from(
  formDropdownElements,
  (formDropdownElement) =>
    Array.from(
      formDropdownElement.querySelectorAll<FormDropdownItemQuantityListElement>(
        '.js-form-dropdown__item-quantity-list'
      ),
      (formDropdownItemQuantityListElement) =>
        new FormDropdownItemQuantityList(formDropdownItemQuantityListElement)
    )
).flat();

export type {
  FormDropdownItemQuantityListCustomEvents,
  FormDropdownItemQuantityList,
  FormDropdownItemQuantityListElementWithComponent,
};

export { formDropdownItemQuantityLists as default };
