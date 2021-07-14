// page's resources
import './form-elements.pug';
import './form-elements.scss';

// components
import {
  FormDropdownWithItemQuantityList,
  FormDropdownWithItemQuantityListElementWithComponent,
} from '@common.blocks/primitives/form-dropdown/form-dropdown';

const components = {
  dropdownExpandedPlural: (document.querySelector('.form-elements-layout__dropdown-expanded-plural')
    ?.firstElementChild as FormDropdownWithItemQuantityListElementWithComponent)
    .component as FormDropdownWithItemQuantityList,
  dropdownExpandedApply: (document.querySelector('.form-elements-layout__dropdown-expanded-apply')
    ?.firstElementChild as FormDropdownWithItemQuantityListElementWithComponent)
    .component as FormDropdownWithItemQuantityList,
  dropdownExpandedClearApply: (document.querySelector(
    '.form-elements-layout__dropdown-expanded-clear-apply'
  )?.firstElementChild as FormDropdownWithItemQuantityListElementWithComponent)
    .component as FormDropdownWithItemQuantityList,
};

components.dropdownExpandedPlural.getExpandableItemElement().component.open();
components.dropdownExpandedApply.getExpandableItemElement().component.open();
components.dropdownExpandedClearApply.getExpandableItemElement().component.open();
