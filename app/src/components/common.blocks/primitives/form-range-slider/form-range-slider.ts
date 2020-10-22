import noUiSlider from "@library.blocks/primitives/form-range-slider/form-range-slider";

document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".form-range-slider__slider");

  sliders.forEach((slider: HTMLDivElement) => {
    const start = JSON.parse(slider.dataset.start);
    const range = JSON.parse(slider.dataset.range);

    noUiSlider.create(slider, {
      start,
      range,
      connect: true, // Display colored bars between handles
      step: 1,
    });

    const inputFrom = document.querySelector(`#${slider.id}-from`) as HTMLInputElement;
    const inputTo = document.querySelector(`#${slider.id}-to`) as HTMLInputElement;
    const result = document.querySelector(`#${slider.id}-result`) as HTMLOutputElement;

    inputFrom.min = inputTo.min = range["min"];
    inputFrom.max = inputTo.max = range["max"];

    slider.noUiSlider.on("update", (values: Array<string>) => {
      inputFrom.value = values[0];
      inputTo.value = values[values.length - 1];
      result.value =
        parseInt(values[0]).toLocaleString() +
        result.dataset.suffix +
        " - " +
        parseInt(values[values.length - 1]).toLocaleString() +
        result.dataset.suffix;
    });
  });
});
