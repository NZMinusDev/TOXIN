import BEMComponent, {
  HTMLElementWithComponent,
} from '@shared/utils/scripts/components/BEM/BEMComponent';

import type {
  FormExpandableCheckboxListExpanderInputCustomEvents,
  FormExpandableCheckboxListExpanderInputElementWithComponent,
} from './__expander-input/form-expandable-checkbox-list__expander-input';
import './__expander-input/form-expandable-checkbox-list__expander-input';
import formExpandableCheckboxListElements, {
  FormExpandableCheckboxListElement,
} from './form-expandable-checkbox-list-elements';

type FormExpandableCheckboxListDOM = {
  headingLabel: HTMLLabelElement;
  expanderIcon: HTMLSpanElement;
  expanderInput: FormExpandableCheckboxListExpanderInputElementWithComponent;
};

type FormExpandableCheckboxListCustomEvents =
  {} & FormExpandableCheckboxListExpanderInputCustomEvents;

class FormExpandableCheckboxList extends BEMComponent<
  FormExpandableCheckboxListElement,
  FormExpandableCheckboxListCustomEvents
> {
  protected readonly _DOM: Readonly<FormExpandableCheckboxListDOM>;

  constructor(
    formExpandableCheckboxListElement: FormExpandableCheckboxListElement
  ) {
    super(formExpandableCheckboxListElement);

    this._DOM = this._initDOM();

    this._bindHeadingLabelListeners()._bindExpanderInputListeners();
  }

  protected _initDOM() {
    const headingLabel = this.element.querySelector(
      '.js-form-expandable-checkbox-list__heading-label'
    ) as FormExpandableCheckboxListDOM['headingLabel'];
    const expanderIcon = headingLabel.querySelector(
      '.js-form-expandable-checkbox-list__expand-icon'
    ) as FormExpandableCheckboxListDOM['expanderIcon'];
    const expanderInput =
      headingLabel.control as FormExpandableCheckboxListDOM['expanderInput'];

    return { headingLabel, expanderIcon, expanderInput };
  }

  protected _bindHeadingLabelListeners() {
    const { headingLabel } = this._DOM;

    headingLabel.addEventListener(
      'keydown',
      this._headingLabelEventListenerObject.handleHeadingLabelKeyDown
    );

    return this;
  }

  protected _headingLabelEventListenerObject = {
    handleHeadingLabelKeyDown: (event: KeyboardEvent) => {
      const { currentTarget } = event;

      const shouldClick = !event.repeat && event.code === 'Enter';

      if (currentTarget instanceof HTMLElement && shouldClick) {
        currentTarget.click();
      }
    },
  };

  protected _bindExpanderInputListeners() {
    const { expanderInput } = this._DOM;
    const { component } = expanderInput;

    component.addCustomEventListener(
      'change',
      this._expanderInputEventListenerObject.handleExpanderInputChange
    );

    return this;
  }

  protected _expanderInputEventListenerObject = {
    handleExpanderInputChange: () => {
      const icon = this._DOM.expanderIcon.firstElementChild as HTMLElement;

      icon.textContent =
        icon.textContent === 'expand_less' ? 'expand_more' : 'expand_less';
    },
  };
}

type FormExpandableCheckboxListElementWithComponent = HTMLElementWithComponent<
  FormExpandableCheckboxListElement,
  FormExpandableCheckboxListCustomEvents,
  FormExpandableCheckboxList
>;

const formExpandableCheckboxLists = Array.from(
  formExpandableCheckboxListElements,
  (formExpandableCheckboxListElement) =>
    new FormExpandableCheckboxList(formExpandableCheckboxListElement)
);

export type {
  FormExpandableCheckboxListCustomEvents,
  FormExpandableCheckboxList,
  FormExpandableCheckboxListElementWithComponent,
};

export { formExpandableCheckboxLists as default };
