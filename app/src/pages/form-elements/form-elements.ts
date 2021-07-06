// page's resources
import './form-elements.pug';
import './form-elements.scss';

// components
import iqLists from '@common.blocks/primitives/form-dropdown/__item-quantity-list/form-dropdown__item-quantity-list';

// focus components
(document.querySelector('#text') as HTMLElement).focus();

iqLists.forEach((iqList) => {
  const shouldBeOpened =
    iqList.element.closest('.form-elements-layout__dropdown-expanded-plural') ||
    iqList.element.closest('.form-elements-layout__dropdown-expanded-apply') ||
    iqList.element.closest('.form-elements-layout__dropdown-expanded-clear-apply');

  if (shouldBeOpened) {
    iqList.open();
  }
});
