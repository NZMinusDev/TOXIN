// page's resources
import './form-elements.pug';
import './form-elements.scss';

// components
import itemQuantityLists from '@common.blocks/primitives/form-dropdown/__item-quantity-list/form-dropdown__item-quantity-list';

// focus components
(document.querySelector('#text') as HTMLElement).focus();

itemQuantityLists.forEach((itemQuantityList) => {
  const shouldBeOpened =
    itemQuantityList.element.closest('.form-elements-layout__dropdown-expanded-plural') ||
    itemQuantityList.element.closest('.form-elements-layout__dropdown-expanded-apply') ||
    itemQuantityList.element.closest('.form-elements-layout__dropdown-expanded-clear-apply');

  if (shouldBeOpened) {
    itemQuantityList.open();
  }
});
