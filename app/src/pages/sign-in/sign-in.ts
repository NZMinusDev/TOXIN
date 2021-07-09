import './sign-in.pug';
import './sign-in.scss';

const cardContainerElements = Array.from(
  document.querySelectorAll('.sign-in-layout__card')
) as HTMLDivElement[];

cardContainerElements.forEach((cardContainerElement, key, nodeList) => {
  const cardElement = cardContainerElement.querySelector('.card-base') as HTMLFormElement;
  const switchBtn = cardElement.querySelector(
    `.${cardElement.name}__switch-btn`
  ) as HTMLButtonElement;

  const handleSwitchBtnClick = () => {
    nodeList.forEach((currentCardElement) => {
      currentCardElement.classList.toggle('sign-in-layout__card_hidden');
    });
  };

  switchBtn.addEventListener('click', handleSwitchBtnClick);
});
