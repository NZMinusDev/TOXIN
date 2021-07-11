import noUiSlider from '@library.blocks/primitives/form-range-slider/form-range-slider';
import { BEMComponent } from '@utils/devTools/scripts/ComponentCreationHelper';

type RangeSliderElement = HTMLDivElement;

interface HTMLDivElementWithSlider extends HTMLDivElement {
  // eslint-disable-next-line no-use-before-define
  noUiSlider: noUiSlider;
}

type RangeSliderDOM = {
  slider: HTMLDivElementWithSlider;
  result: HTMLOutputElement;
  inputFrom: HTMLInputElement;
  inputTo: HTMLInputElement;
};

type RangeSliderCustomEvents = 'change';

class RangeSlider extends BEMComponent<RangeSliderElement, RangeSliderCustomEvents> {
  protected readonly _DOM: Readonly<RangeSliderDOM>;

  constructor(rangeSliderElement: RangeSliderElement) {
    super(rangeSliderElement);

    this._DOM = this._initDOM();
    this._initLibRangeSlider();

    this._bindSliderListeners();
  }

  protected _initDOM(): RangeSliderDOM {
    const slider = this.element.querySelector(
      '.form-range-slider__slider'
    ) as RangeSliderDOM['slider'];
    const result = this.element.querySelector(
      '.form-range-slider__result'
    ) as RangeSliderDOM['result'];
    const inputFrom = this.element.querySelector(
      `[name=${result.name}-0]`
    ) as RangeSliderDOM['inputFrom'];
    const inputTo = this.element.querySelector(
      `[name=${result.name}-1]`
    ) as RangeSliderDOM['inputTo'];

    return { slider, result, inputFrom, inputTo };
  }
  protected _initLibRangeSlider() {
    noUiSlider.create(this._DOM.slider, {
      start: [this._DOM.inputFrom.value, this._DOM.inputTo.value],
      range: { min: Number(this._DOM.inputFrom.min), max: Number(this._DOM.inputFrom.max) },
      connect: true,
    });

    return this;
  }

  protected _bindSliderListeners() {
    this._DOM.slider.noUiSlider.on('update', this._sliderEventListenerObject.handleSliderUpdate);
    this._DOM.slider.noUiSlider.on('change', this._sliderEventListenerObject.handleSliderChange);

    return this;
  }
  protected _sliderEventListenerObject = {
    handleSliderUpdate: (values: Array<string>) => {
      const [valueFrom, valueTo] = values;

      this._DOM.inputFrom.value = valueFrom;
      this._DOM.inputTo.value = valueTo;
      this._DOM.result.value = `${parseInt(valueFrom, 10).toLocaleString()}₽ - ${parseInt(
        valueTo,
        10
      ).toLocaleString()}₽`;
    },

    handleSliderChange: (values: Array<string>, handle: number) => {
      switch (handle) {
        case 0: {
          this._DOM.inputFrom.dispatchEvent(new Event('change'));

          break;
        }
        case 1: {
          this._DOM.inputTo.dispatchEvent(new Event('change'));

          break;
        }

        // no default
      }
    },
  };
}

const rangeSliders = Array.from(
  document.querySelectorAll('.form-range-slider') as NodeListOf<HTMLDivElement>,
  (rangeSliderElement) => new RangeSlider(rangeSliderElement)
);

export { rangeSliders as default, RangeSliderCustomEvents };
