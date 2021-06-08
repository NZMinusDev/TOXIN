const btnContainers = document.querySelectorAll('.form-like-button');

btnContainers.forEach((btnContainer) => {
  const btn = btnContainer.querySelector('.form-like-button__button') as HTMLInputElement;
  const counter = btnContainer.querySelector('.form-like-button__counter') as HTMLSpanElement;

  const handleButtonChange = (e: Event) => {
    counter.textContent = (e.currentTarget as HTMLInputElement).checked
      ? `${Number(counter.textContent) + 1}`
      : `${Number(counter.textContent) - 1}`;
  };

  btn.addEventListener('change', handleButtonChange);
});
