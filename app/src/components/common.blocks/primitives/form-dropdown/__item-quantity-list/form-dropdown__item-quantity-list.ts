import { BEMComponent } from '@utils/devTools/scripts/ComponentCreationHelper';
import { has } from '@utils/devTools/scripts/DOMHelper';

import { Unpacked } from '@utils/devTools/scripts/TypingHelper';
import dropdowns from '../form-dropdown';

// TODO: aria-expanded менять для кнопки использовать dispatchEvent

type ToxinIQDropdownElement = HTMLDivElement;

type ItemQuantityListStaticDOM = {
  $self: JQuery<ToxinIQDropdownElement>;
  listInput: HTMLInputElement;
  selection: HTMLParagraphElement;
  menu: HTMLDivElement;
  optionInputs: NodeListOf<HTMLInputElement>;
  menuOptions: NodeListOf<HTMLDivElement>;
};
type ItemQuantityListGeneratedDOM = {
  decrementButtons: NodeListOf<HTMLButtonElement>;
  incrementButtons: NodeListOf<HTMLButtonElement>;
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

type ParentBlock = Unpacked<typeof dropdowns>;

class ItemQuantityList implements BEMComponent<ItemQuantityListCustomEvents> {
  readonly element: ToxinIQDropdownElement;
  protected readonly _staticDOM: Readonly<ItemQuantityListStaticDOM>;
  protected readonly _generatedDOM: Readonly<ItemQuantityListGeneratedDOM>;

  private _datasetOptions: ItemQuantityListDatasetOptions;
  protected _totalItems = -1;

  protected _itemsCounter = new Map<string, number>();
  protected _groupsCounter = new Map<string, number>();

  protected _parentBlock: ParentBlock;

  constructor(ItemQuantityListElement: ToxinIQDropdownElement) {
    this.element = ItemQuantityListElement;
    this._staticDOM = this._initStaticDOM();
    this._datasetOptions = this._initOptionsFromDataset();
    this._initLibItemQuantityList();
    this._generatedDOM = this._initGeneratedDOM();

    const subBlocks = this._initSubBlocks();
    this._parentBlock = subBlocks._parentBlock;

    this._bindListeners();
    this._bindCounterBtnListeners();

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

      const decrementBtn = this._generatedDOM.decrementButtons.item(index);

      // eslint-disable-next-line no-loops/no-loops
      while (amountToDecrement !== 0) {
        decrementBtn.dispatchEvent(new Event('click'));
        amountToDecrement -= 1;
      }
    });
  }

  open() {
    if (!this.element.classList.contains('menu-open')) {
      this.element.classList.add('menu-open');

      return true;
    }

    return false;
  }
  close() {
    if (this.element.classList.contains('menu-open')) {
      this.element.classList.remove('menu-open');

      this.element.dispatchEvent(new CustomEvent('close', { bubbles: true }));

      return true;
    }

    return false;
  }
  toggle() {
    if (!this.open()) {
      this.close();
    }
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
    const optionInputs = menu.querySelectorAll(
      '.form-dropdown__option-input'
    ) as ItemQuantityListStaticDOM['optionInputs'];
    const menuOptions = menu.querySelectorAll(
      '.iqdropdown-menu-option'
    ) as ItemQuantityListStaticDOM['menuOptions'];

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
    return {
      selection: { placeholder: this._staticDOM.selection.dataset.placeholder || '' },
      menu: {
        groups:
          this._staticDOM.menu.dataset.groups !== undefined
            ? JSON.parse(this._staticDOM.menu.dataset.groups)
            : '',
      },
      menuOptions: new Map(
        Array.from(this._staticDOM.menuOptions).map((menuOption) => [
          menuOption,
          {
            id: menuOption.dataset.id || '',
            defaultCount: Number(menuOption.dataset.defaultcount),
            minCount: Number(menuOption.dataset.mincount),
            maxCount: Number(menuOption.dataset.maxcount),
            group: menuOption.dataset.group || '',
          },
        ])
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
  }
  protected _initGeneratedDOM(): ItemQuantityListGeneratedDOM {
    const decrementButtons = this._staticDOM.menu.querySelectorAll(
      '.button-decrement'
    ) as ItemQuantityListGeneratedDOM['decrementButtons'];
    const incrementButtons = this._staticDOM.menu.querySelectorAll(
      '.button-increment'
    ) as ItemQuantityListGeneratedDOM['incrementButtons'];

    return {
      decrementButtons,
      incrementButtons,
    };
  }

  protected _initSubBlocks() {
    const outerDropdownElement = this.element.closest('.form-dropdown');

    const _parentBlock = dropdowns.find(
      (dropdown) => dropdown.element === outerDropdownElement
    ) as ParentBlock;

    return { _parentBlock };
  }

  protected _bindListeners() {
    this.element.addEventListener('close', this.onClose);
  }
  protected onClose = () => {
    this._changeValueOfInputs();
  };

  protected _generateResultText() {
    const { groups } = this._datasetOptions.menu;

    let result = '';
    if (this._totalItems > 0) {
      let appendedText = '';

      this._groupsCounter.forEach((groupAmount, groupKey) => {
        if (groupAmount > 0) {
          if (result !== '') result += ', ';

          appendedText =
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
  }
  protected _changeValueOfInputs() {
    let accumulator = '';
    this._staticDOM.menuOptions.forEach((menuOption, index) => {
      const menuOptionDataset = this._datasetOptions.menuOptions.get(menuOption) as Unpacked<
        ItemQuantityListDatasetOptions['menuOptions']
      >;

      const counterAmount = this._itemsCounter.get(menuOptionDataset.id as string);
      const input = this._staticDOM.optionInputs.item(index);

      input.value = `${counterAmount}`;

      if (index > 0) accumulator += ',';
      accumulator += counterAmount;
    });

    this._staticDOM.listInput.value = accumulator;

    this.element.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        detail: { value: this._staticDOM.listInput.value },
      })
    );
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

    const menuOptionIndex = Array.from(this._staticDOM.menuOptions).indexOf(targetMenuOption);
    const decrementBtn = this._generatedDOM.decrementButtons.item(menuOptionIndex);
    const incrementBtn = this._generatedDOM.incrementButtons.item(menuOptionIndex);

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
  }

  protected _initDisplay() {
    this._staticDOM.menuOptions.forEach((menuOption) => {
      this._updateCounterButtonDisplay(menuOption);
    });
  }
}

const dropdownsWithItemQuantityList = dropdowns.filter((dropdown) =>
  dropdown.element.querySelector('.form-dropdown__item-quantity-list')
);

const itemQuantityLists = dropdownsWithItemQuantityList.map(
  (dropdown) =>
    new ItemQuantityList(
      dropdown.element.querySelector('.form-dropdown__item-quantity-list') as ToxinIQDropdownElement
    )
);

export { itemQuantityLists as default, ItemQuantityListCustomEvents };
