import { getURLValue, addURLValues } from '@utils/devTools/tools/URLHelper';

document.querySelectorAll('input').forEach((element) => {
  const inputElement = element as HTMLInputElement;
  const hrefValue = getURLValue(inputElement.getAttribute('name')) as string;

  if (hrefValue) {
    switch (inputElement.type) {
      case 'radio': {
        inputElement.checked = inputElement.value === hrefValue;

        break;
      }
      case 'checkbox': {
        inputElement.checked = hrefValue === 'on';

        break;
      }

      default: {
        inputElement.value = hrefValue;
      }
    }
  }

  if (inputElement.type === 'checkbox') {
    const onChange = (e: Event) => {
      (e.currentTarget as HTMLInputElement).value = (e.currentTarget as HTMLInputElement).checked
        ? 'on'
        : 'off';
    };

    inputElement.addEventListener('change', onChange);
  }

  if (inputElement.getAttribute('isFilter')) {
    const onChange = (event) => {
      addURLValues({
        name: inputElement.getAttribute('name'),
        value: inputElement.value,
      });
    };

    inputElement.addEventListener('change', onChange);
  }
});
