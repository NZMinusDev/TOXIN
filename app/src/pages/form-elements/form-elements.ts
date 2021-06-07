// page's resources
import './form-elements.pug';
import './form-elements.scss';

// libs
import { has } from '@utils/devTools/scripts/DOMHelper';

// components
import {
  dropdownsWithIQList,
  ToxinIQDropdownElement,
} from '@common.blocks/primitives/form-dropdown/__item-quantity-list/form-dropdown__item-quantity-list';

// focus components
(document.querySelector('#text-field-hover') as HTMLElement).focus();

const DROPDOWN_SELECTOR = '.form-dropdown';

(has(dropdownsWithIQList, '#dropdown-expanded-plural').closest(
  DROPDOWN_SELECTOR
) as ToxinIQDropdownElement).toxinIQDropdown.open();
(has(dropdownsWithIQList, '#dropdown-expanded-apply').closest(
  DROPDOWN_SELECTOR
) as ToxinIQDropdownElement).toxinIQDropdown.open();
(has(dropdownsWithIQList, '#dropdown-expanded-clear-apply').closest(
  DROPDOWN_SELECTOR
) as ToxinIQDropdownElement).toxinIQDropdown.open();
