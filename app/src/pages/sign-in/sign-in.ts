import './sign-in.pug';
import './sign-in.scss';

const cardContainerElements = [
  ...document.querySelectorAll('.sign-in-layout__card'),
] as HTMLDivElement[];

cardContainerElements.forEach((cardContainerElement, key, nodeList) => {
  const handleSwitchBtnClick = (event: MouseEvent) => {
    const target = event.target as HTMLButtonElement;

    const isSwitchBtn = target.value === 'Создать' || target.value === 'Войти';

    if (target.type !== 'submit' && isSwitchBtn) {
      nodeList.forEach((currentCardElement) => {
        currentCardElement.classList.toggle('sign-in-layout__card_hidden');
      });
    }
  };

  cardContainerElement.addEventListener('click', handleSwitchBtnClick);
});
