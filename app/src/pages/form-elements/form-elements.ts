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
(document.querySelector('#text') as HTMLElement).focus();

const dropdownSelector = '.form-dropdown';

(has(dropdownsWithIQList, '#facilities-2').closest(
  dropdownSelector
) as ToxinIQDropdownElement).toxinIQDropdown.open();
(has(dropdownsWithIQList, '#guests-1').closest(
  dropdownSelector
) as ToxinIQDropdownElement).toxinIQDropdown.open();
(has(dropdownsWithIQList, '#guests-2').closest(
  dropdownSelector
) as ToxinIQDropdownElement).toxinIQDropdown.open();
