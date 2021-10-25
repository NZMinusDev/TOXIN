import BEMComponent, {
  HTMLElementWithComponent,
} from '@shared/utils/scripts/view/BEM/BEMComponent';
import { addURLValues } from '@shared/utils/scripts/URLHelper';
import { Unpacked } from '@shared/utils/scripts/TypingHelper';
import noUiSlider from '@library.blocks/primitives/form-range-slider/form-range-slider';

import formRangeSliderElements, {
  FormRangeSliderElement,
} from './form-range-slider-elements';

interface HTMLDivElementWithSlider extends HTMLDivElement {
  noUiSlider: noUiSlider;
}

type FormRangeSliderDOM = {
  slider: HTMLDivElementWithSlider;
  result: HTMLOutputElement;
  inputs: HTMLInputElement[];
};

type FormRangeSliderHTMLOptions = {
  isFilter: boolean;
};

type FormRangeSliderCustomEvents = { change: {} };

class FormRangeSlider extends BEMComponent<
  FormRangeSliderElement,
  FormRangeSliderCustomEvents
> {
  protected readonly _DOM: Readonly<FormRangeSliderDOM>;

  protected readonly _options: FormRangeSliderHTMLOptions;

  constructor(formRangeSliderElement: FormRangeSliderElement) {
    super(formRangeSliderElement);

    this._DOM = this._initDOM();
    this._initLibRangeSlider();

    this._options = this._initOptionsFromHTML();

    this._bindInputsListeners()._bindSliderListeners();
  }

  protected _initDOM() {
    const slider = this.element.querySelector(
      '.js-form-range-slider__slider'
    ) as FormRangeSliderDOM['slider'];
    const result = this.element.querySelector(
      '.js-form-range-slider__result'
    ) as FormRangeSliderDOM['result'];
    const inputs = [
      ...this.element.querySelectorAll('.js-form-range-slider__input'),
    ] as FormRangeSliderDOM['inputs'];

    return { slider, result, inputs };
  }

  protected _initLibRangeSlider() {
    const { inputs } = this._DOM;

    noUiSlider.create(this._DOM.slider, {
      start: inputs.map((input) => input.value),
      range: {
        min: Number(inputs[0].min),
        max: Number(inputs[0].max),
      },
      connect: true,
    });

    return this;
  }

  protected _initOptionsFromHTML() {
    const isFilter = this.element.dataset.isFilter !== undefined;

    return { isFilter };
  }

  protected _bindInputsListeners() {
    const { inputs } = this._DOM;

    inputs.forEach((input) => {
      input.addEventListener(
        'change',
        this._inputsEventListenerObject.handleInputChange
      );
    });

    return this;
  }

  protected _inputsEventListenerObject = {
    handleInputChange: (event: Event) => {
      const currentTarget = event.currentTarget as Unpacked<
        FormRangeSliderDOM['inputs']
      >;

      if (this._options.isFilter) {
        addURLValues({ name: currentTarget.name, value: currentTarget.value });
      }
    },
  };

  protected _bindSliderListeners() {
    this._DOM.slider.noUiSlider.on(
      'update',
      this._sliderEventListenerObject.handleSliderUpdate
    );
    this._DOM.slider.noUiSlider.on(
      'change',
      this._sliderEventListenerObject.handleSliderChange
    );

    return this;
  }

  protected _sliderEventListenerObject = {
    handleSliderUpdate: (values: Array<string>) => {
      const { inputs, result } = this._DOM;
      const [valueFrom] = values;
      const valueTo = values[values.length - 1];

      values.forEach((value, index) => {
        inputs[index].value = value;
      });

      result.value = `${parseInt(valueFrom, 10).toLocaleString()}₽ - ${parseInt(
        valueTo,
        10
      ).toLocaleString()}₽`;
    },
    handleSliderChange: (values: Array<string>, handle: number) => {
      const { inputs } = this._DOM;

      inputs[handle].dispatchEvent(new Event('change'));
      this.element.dispatchEvent(new CustomEvent('change', { bubbles: true }));
    },
  };
}

type FormRangeSliderElementWithComponent = HTMLElementWithComponent<
  FormRangeSliderElement,
  FormRangeSliderCustomEvents,
  FormRangeSlider
>;

const formRangeSliders = Array.from(
  formRangeSliderElements,
  (formRangeSliderElement) => new FormRangeSlider(formRangeSliderElement)
);

export type {
  FormRangeSliderCustomEvents,
  FormRangeSlider,
  FormRangeSliderElementWithComponent,
};

export { formRangeSliders as default };
