import noUiSlider from '@library.blocks/primitives/form-range-slider/form-range-slider';

interface HTMLDivElementWithSlider extends HTMLDivElement {
  // eslint-disable-next-line no-use-before-define
  noUiSlider: noUiSlider;
}

const sliderContainers = document.querySelectorAll('.form-range-slider') as NodeListOf<
  HTMLDivElement
>;

const _initDOM = (sliderContainer: HTMLDivElement) => {
  const slider = sliderContainer.querySelector(
    '.form-range-slider__slider'
  ) as HTMLDivElementWithSlider;
  const result = sliderContainer.querySelector('.form-range-slider__result') as HTMLOutputElement;
  const inputFrom = sliderContainer.querySelector(`[name=${result.name}-0]`) as HTMLInputElement;
  const inputTo = sliderContainer.querySelector(`[name=${result.name}-1]`) as HTMLInputElement;

  return { slider, result, inputFrom, inputTo };
};

sliderContainers.forEach((sliderContainer) => {
  const DOM = _initDOM(sliderContainer);

  noUiSlider.create(DOM.slider, {
    start: [DOM.inputFrom.value, DOM.inputTo.value],
    range: { min: Number(DOM.inputFrom.min), max: Number(DOM.inputFrom.max) },
    connect: true,
  });

  const onUpdate = (values: Array<string>) => {
    const [valueFrom, valueTo] = values;

    DOM.inputFrom.value = valueFrom;
    DOM.inputTo.value = valueTo;
    DOM.result.value = `${parseInt(valueFrom, 10).toLocaleString()}₽ - ${parseInt(
      valueTo,
      10
    ).toLocaleString()}₽`;
  };

  const onChange = (values: Array<string>, handle: number) => {
    switch (handle) {
      case 0: {
        DOM.inputFrom.dispatchEvent(new Event('change'));

        break;
      }
      case 1: {
        DOM.inputTo.dispatchEvent(new Event('change'));

        break;
      }

      // no default
    }
  };

  DOM.slider.noUiSlider.on('update', onUpdate);
  DOM.slider.noUiSlider.on('change', onChange);
});

export { sliderContainers as default };
