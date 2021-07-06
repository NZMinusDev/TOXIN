import { Plugin } from '@utils/devTools/scripts/PluginCreationHelper';
import { has } from '@utils/devTools/scripts/DOMHelper';

import { Unpacked } from '@utils/devTools/scripts/TypingHelper';
import dropdowns from '../form-dropdown';

// TODO: aria-expanded менять для кнопки использовать dispatchEvent

type ToxinIQDropdownElement = HTMLDivElement;

type IQListStaticDOM = {
  $self: JQuery<ToxinIQDropdownElement>;
  mainInput: HTMLInputElement;
  selection: HTMLParagraphElement;
  menu: HTMLDivElement;
  optionInputs: NodeListOf<HTMLInputElement>;
  menuOptions: NodeListOf<HTMLDivElement>;
  optionTitles: NodeListOf<HTMLHeadingElement>;
};
type IQListGeneratedDOM = {
  controls: NodeListOf<HTMLDivElement>;
  decrementButtons: NodeListOf<HTMLButtonElement>;
  incrementButtons: NodeListOf<HTMLButtonElement>;
  counters: NodeListOf<HTMLSpanElement>;
};

type DatasetIQListOptions = {
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

type IQListEvents = 'select' | 'close';

type ParentBlock = Unpacked<typeof dropdowns>;

class IQList implements Plugin<IQListEvents> {
  readonly element: ToxinIQDropdownElement;
  protected readonly _staticDOM: Readonly<IQListStaticDOM>;
  protected readonly _generatedDOM: Readonly<IQListGeneratedDOM>;

  private _datasetIQListOptions: DatasetIQListOptions;
  protected _totalItems = -1;

  protected _itemsCounter = new Map<string, number>();
  protected _groupsCounter = new Map<string, number>();

  protected _parentBlock: ParentBlock;

  constructor(IQListElement: ToxinIQDropdownElement) {
    this.element = IQListElement;
    this._staticDOM = IQList._initStaticDOM(IQListElement);
    this._datasetIQListOptions = this._initDatasetIQListOptions();
    this._initLibIQList();
    this._generatedDOM = this._initGeneratedDOM();

    const subBlocks = this._initSubBlocks();
    this._parentBlock = subBlocks._parentBlock;

    this._bindListeners();
    this._bindCounterBtnListeners();

    this._init();
  }

  getTotalAmount() {
    return this._totalItems;
  }
  reset() {
    this._staticDOM.menuOptions.forEach((menuOption, index) => {
      const menuOptionDataset = this._datasetIQListOptions.menuOptions.get(menuOption) as Unpacked<
        DatasetIQListOptions['menuOptions']
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

  protected static _initStaticDOM(dropdown: ToxinIQDropdownElement): IQListStaticDOM {
    return {
      $self: $(dropdown) as IQListStaticDOM['$self'],
      mainInput: dropdown.querySelector(
        '.form-dropdown__list-input'
      ) as IQListStaticDOM['mainInput'],
      selection: dropdown.querySelector('.iqdropdown-selection') as IQListStaticDOM['selection'],
      menu: dropdown.querySelector('.iqdropdown-menu') as IQListStaticDOM['menu'],
      optionInputs: dropdown.querySelectorAll(
        '.form-dropdown__option-input'
      ) as IQListStaticDOM['optionInputs'],
      menuOptions: dropdown.querySelectorAll(
        '.iqdropdown-menu-option'
      ) as IQListStaticDOM['menuOptions'],
      optionTitles: dropdown.querySelectorAll(
        '.iqdropdown-item'
      ) as IQListStaticDOM['optionTitles'],
    };
  }
  protected _initDatasetIQListOptions(): DatasetIQListOptions {
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
  private _initLibIQList() {
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
  protected _initGeneratedDOM(): IQListGeneratedDOM {
    return {
      controls: this._staticDOM.menu.querySelectorAll(
        '.form-dropdown__counter-control'
      ) as IQListGeneratedDOM['controls'],
      decrementButtons: this._staticDOM.menu.querySelectorAll(
        '.button-decrement'
      ) as IQListGeneratedDOM['decrementButtons'],
      incrementButtons: this._staticDOM.menu.querySelectorAll(
        '.button-increment'
      ) as IQListGeneratedDOM['incrementButtons'],
      counters: this._staticDOM.menu.querySelectorAll('.counter') as IQListGeneratedDOM['counters'],
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
    this._updateValueOfInputs();
  };

  protected _generateResultText() {
    const { groups } = this._datasetIQListOptions.menu;

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
      result = this._datasetIQListOptions.selection.placeholder;
    }

    return result;
  }
  protected _updateCounters(itemCount: { [itemID: string]: number }) {
    this._itemsCounter.clear();
    this._groupsCounter.clear();

    this._staticDOM.menuOptions.forEach((menuOption) => {
      const menuOptionDataset = this._datasetIQListOptions.menuOptions.get(menuOption) as Unpacked<
        DatasetIQListOptions['menuOptions']
      >;

      this._itemsCounter.set(menuOptionDataset.id, itemCount[menuOptionDataset.id]);
      this._groupsCounter.set(
        menuOptionDataset.group,
        (this._groupsCounter.get(menuOptionDataset.group) || 0) + itemCount[menuOptionDataset.id]
      );
    });
  }
  protected _updateValueOfInputs() {
    let accumulator = '';
    this._staticDOM.menuOptions.forEach((menuOption, index) => {
      const menuOptionDataset = this._datasetIQListOptions.menuOptions.get(menuOption) as Unpacked<
        DatasetIQListOptions['menuOptions']
      >;

      const counterAmount = this._itemsCounter.get(menuOptionDataset.id as string);
      const input = this._staticDOM.optionInputs.item(index);

      input.value = `${counterAmount}`;

      if (index > 0) accumulator += ',';
      accumulator += counterAmount;
    });

    this._staticDOM.mainInput.value = accumulator;
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
          IQListGeneratedDOM['decrementButtons'] | IQListGeneratedDOM['incrementButtons']
        >
      ) as Unpacked<IQListStaticDOM['menuOptions']>;

      this._updateCounterButtonDisplay(targetMenuOption);

      this.element.dispatchEvent(new CustomEvent('select', { bubbles: true }));
    },
  };

  protected _updateCounterButtonDisplay(
    targetMenuOption: Unpacked<IQListStaticDOM['menuOptions']>
  ) {
    const targetMenuOptionDataset = this._datasetIQListOptions.menuOptions.get(
      targetMenuOption
    ) as Unpacked<DatasetIQListOptions['menuOptions']>;

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

  protected _init() {
    this._staticDOM.menuOptions.forEach((menuOption) => {
      this._updateCounterButtonDisplay(menuOption);
    });
  }
}

const dropdownsWithIQList = dropdowns.filter((dropdown) =>
  dropdown.element.querySelector('.form-dropdown__item-quantity-list')
);

const iqLists = dropdownsWithIQList.map(
  (dropdown) =>
    new IQList(
      dropdown.element.querySelector('.form-dropdown__item-quantity-list') as ToxinIQDropdownElement
    )
);

export { iqLists as default, IQListEvents };
