import {
  BEMComponent,
  HTMLElementWithComponent,
} from '@utils/devTools/scripts/ComponentCreationHelper';
import { has } from '@utils/devTools/scripts/DOMHelper';

import { Unpacked } from '@utils/devTools/scripts/TypingHelper';
import dropdowns from '../form-dropdown';

type ItemQuantityListElement = HTMLDivElement;

type ItemQuantityListStaticDOM = {
  $self: JQuery<ItemQuantityListElement>;
  listInput: HTMLInputElement;
  selection: HTMLParagraphElement;
  menu: HTMLDivElement;
  optionInputs: HTMLInputElement[];
  menuOptions: HTMLDivElement[];
};
type ItemQuantityListGeneratedDOM = {
  decrementButtons: HTMLButtonElement[];
  incrementButtons: HTMLButtonElement[];
};

type ItemQuantityListDatasetOptions = {
  selection: { placeholder: string };
  menu: { groups: { [groupName: string]: { selectionText: string; textPlural: string } } };
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
};

type ItemQuantityListCustomEvents = 'select' | 'close' | 'change';

class ItemQuantityList extends BEMComponent<ItemQuantityListElement, ItemQuantityListCustomEvents> {
  protected readonly _staticDOM: Readonly<ItemQuantityListStaticDOM>;
  protected readonly _generatedDOM: Readonly<ItemQuantityListGeneratedDOM>;

  private _datasetOptions: ItemQuantityListDatasetOptions;
  protected _totalItems = -1;

  protected _itemsCounter = new Map<string, number>();
  protected _groupsCounter = new Map<string, number>();

  constructor(itemQuantityListElement: ItemQuantityListElement) {
    super(itemQuantityListElement);

    this._staticDOM = this._initStaticDOM();
    this._datasetOptions = this._initOptionsFromDataset();
    this._generatedDOM = this._initLibItemQuantityList()._initGeneratedDOM();

    this._bindListeners()._bindCounterBtnListeners();

    this._initDisplay();
  }

  getTotalAmount() {
    return this._totalItems;
  }
  reset() {
    this._staticDOM.menuOptions.forEach((menuOption, index) => {
      const menuOptionDataset = this._datasetOptions.menuOptions.get(menuOption) as Unpacked<
        ItemQuantityListDatasetOptions['menuOptions']
      >;

      const currAmount = this._itemsCounter.get(menuOptionDataset.id) as number;
      const minAmount = menuOptionDataset.minCount as number;
      let amountToDecrement = currAmount - minAmount;

      const decrementBtn = this._generatedDOM.decrementButtons[index];

      // eslint-disable-next-line no-loops/no-loops
      while (amountToDecrement !== 0) {
        decrementBtn.dispatchEvent(new Event('click'));
        amountToDecrement -= 1;
      }
    });

    return this;
  }

  open() {
    if (this.isClosed()) {
      this.element.classList.add('menu-open');
    }

    return this;
  }
  close() {
    if (!this.isClosed()) {
      this.element.classList.remove('menu-open');

      this.element.dispatchEvent(new CustomEvent('close', { bubbles: true }));
    }

    return this;
  }
  toggle() {
    if (this.isClosed()) {
      this.open();
    } else {
      this.close();
    }

    return this;
  }
  isClosed() {
    if (!this.element.classList.contains('menu-open')) {
      return true;
    }

    return false;
  }

  protected _initStaticDOM(): ItemQuantityListStaticDOM {
    const $self = $(this.element) as ItemQuantityListStaticDOM['$self'];
    const listInput = this.element.querySelector(
      '.form-dropdown__list-input'
    ) as ItemQuantityListStaticDOM['listInput'];
    const selection = this.element.querySelector(
      '.iqdropdown-selection'
    ) as ItemQuantityListStaticDOM['selection'];
    const menu = this.element.querySelector(
      '.iqdropdown-menu'
    ) as ItemQuantityListStaticDOM['menu'];
    const optionInputs = [
      ...menu.querySelectorAll('.form-dropdown__option-input'),
    ] as ItemQuantityListStaticDOM['optionInputs'];
    const menuOptions = [
      ...menu.querySelectorAll('.iqdropdown-menu-option'),
    ] as ItemQuantityListStaticDOM['menuOptions'];

    return {
      $self,
      listInput,
      selection,
      menu,
      optionInputs,
      menuOptions,
    };
  }
  protected _initOptionsFromDataset(): ItemQuantityListDatasetOptions {
    const values = this._staticDOM.listInput.value.split(',');

    return {
      selection: { placeholder: this._staticDOM.selection.dataset.placeholder || '' },
      menu: {
        groups:
          this._staticDOM.menu.dataset.groups !== undefined
            ? JSON.parse(this._staticDOM.menu.dataset.groups)
            : '',
      },
      menuOptions: new Map(
        this._staticDOM.menuOptions.map((menuOption, index) => {
          // eslint-disable-next-line no-param-reassign
          menuOption.dataset.defaultcount = values[index] ?? menuOption.dataset.defaultcount;

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
    };
  }
  private _initLibItemQuantityList() {
    this._staticDOM.$self.iqDropdown({
      setSelectionText: (itemCount, totalItems) => {
        this._totalItems = totalItems;
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

    // disable toggle menu
    $(this.element).off('click');

    return this;
  }
  protected _initGeneratedDOM(): ItemQuantityListGeneratedDOM {
    const decrementButtons = [
      ...this._staticDOM.menu.querySelectorAll('.button-decrement'),
    ] as ItemQuantityListGeneratedDOM['decrementButtons'];
    const incrementButtons = [
      ...this._staticDOM.menu.querySelectorAll('.button-increment'),
    ] as ItemQuantityListGeneratedDOM['incrementButtons'];

    return {
      decrementButtons,
      incrementButtons,
    };
  }

  protected _bindListeners() {
    this.element.addEventListener('close', this.onClose);

    return this;
  }
  protected onClose = () => {
    this._changeValueOfInputs();
  };

  protected _generateResultText() {
    const { groups } = this._datasetOptions.menu;
    let result = '';

    if (this._totalItems > 0) {
      this._groupsCounter.forEach((groupAmount, groupKey) => {
        if (groupAmount > 0) {
          if (result !== '') {
            result += ', ';
          }

          const appendedText =
            groupAmount === 1 ? groups[groupKey].selectionText : groups[groupKey].textPlural;
          result += `${groupAmount} ${appendedText}`;
        }
      });
    } else {
      result = this._datasetOptions.selection.placeholder;
    }

    return result;
  }
  protected _updateCounters(itemCount: { [itemID: string]: number }) {
    this._itemsCounter.clear();
    this._groupsCounter.clear();

    this._staticDOM.menuOptions.forEach((menuOption) => {
      const menuOptionDataset = this._datasetOptions.menuOptions.get(menuOption) as Unpacked<
        ItemQuantityListDatasetOptions['menuOptions']
      >;

      this._itemsCounter.set(menuOptionDataset.id, itemCount[menuOptionDataset.id]);
      this._groupsCounter.set(
        menuOptionDataset.group,
        (this._groupsCounter.get(menuOptionDataset.group) || 0) + itemCount[menuOptionDataset.id]
      );
    });

    return this;
  }
  protected _changeValueOfInputs() {
    let accumulator = '';
    this._staticDOM.menuOptions.forEach((menuOption, index) => {
      const menuOptionDataset = this._datasetOptions.menuOptions.get(menuOption) as Unpacked<
        ItemQuantityListDatasetOptions['menuOptions']
      >;

      const counterAmount = this._itemsCounter.get(menuOptionDataset.id as string);
      const input = this._staticDOM.optionInputs[index];

      input.value = `${counterAmount}`;

      if (index > 0) {
        accumulator += ',';
      }

      accumulator += counterAmount;
    });

    this._staticDOM.listInput.value = accumulator;

    this._staticDOM.listInput.dispatchEvent(new Event('change'));
    this.element.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        detail: { value: this._staticDOM.listInput.value },
      })
    );

    return this;
  }

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
      const targetMenuOption = has(
        this._staticDOM.menuOptions,
        clickEvent.currentTarget as Unpacked<
          | ItemQuantityListGeneratedDOM['decrementButtons']
          | ItemQuantityListGeneratedDOM['incrementButtons']
        >
      ) as Unpacked<ItemQuantityListStaticDOM['menuOptions']>;

      this._updateCounterButtonDisplay(targetMenuOption);

      this.element.dispatchEvent(new CustomEvent('select', { bubbles: true }));
    },
  };

  protected _updateCounterButtonDisplay(
    targetMenuOption: Unpacked<ItemQuantityListStaticDOM['menuOptions']>
  ) {
    const targetMenuOptionDataset = this._datasetOptions.menuOptions.get(
      targetMenuOption
    ) as Unpacked<ItemQuantityListDatasetOptions['menuOptions']>;

    const menuOptionIndex = this._staticDOM.menuOptions.indexOf(targetMenuOption);
    const decrementBtn = this._generatedDOM.decrementButtons[menuOptionIndex];
    const incrementBtn = this._generatedDOM.incrementButtons[menuOptionIndex];

    const counterAmount = this._itemsCounter.get(targetMenuOptionDataset.id);

    if (targetMenuOptionDataset.minCount === counterAmount) {
      decrementBtn.classList.add('iqdropdown__counter_isDisabled');
    } else {
      decrementBtn.classList.remove('iqdropdown__counter_isDisabled');
    }

    if (targetMenuOptionDataset.maxCount === counterAmount) {
      incrementBtn.classList.add('iqdropdown__counter_isDisabled');
    } else {
      incrementBtn.classList.remove('iqdropdown__counter_isDisabled');
    }

    return this;
  }

  protected _initDisplay() {
    this._staticDOM.menuOptions.forEach((menuOption) => {
      this._updateCounterButtonDisplay(menuOption);
    });

    return this;
  }
}

type ItemQuantityListElementWithComponent = HTMLElementWithComponent<
  ItemQuantityListElement,
  ItemQuantityListCustomEvents,
  ItemQuantityList
>;

const dropdownsWithItemQuantityList = dropdowns.filter((dropdown) =>
  dropdown.element.querySelector('.form-dropdown__item-quantity-list')
);

const itemQuantityLists = dropdownsWithItemQuantityList.map(
  (dropdown) =>
    new ItemQuantityList(
      dropdown.element.querySelector(
        '.form-dropdown__item-quantity-list'
      ) as ItemQuantityListElement
    )
);

export type {
  ItemQuantityListCustomEvents,
  ItemQuantityList,
  ItemQuantityListElementWithComponent,
};

export { itemQuantityLists as default };
