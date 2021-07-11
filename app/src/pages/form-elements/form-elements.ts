// page's resources
import './form-elements.pug';
import './form-elements.scss';

// components
import {
  DropdownElementWithComponent,
  DropdownWithItemQuantityList,
} from '@common.blocks/primitives/form-dropdown/form-dropdown';

const components = {
  dropdownExpandedPlural: (document.querySelector('.form-elements-layout__dropdown-expanded-plural')
    ?.firstElementChild as DropdownElementWithComponent).component as DropdownWithItemQuantityList,
  dropdownExpandedApply: (document.querySelector('.form-elements-layout__dropdown-expanded-apply')
    ?.firstElementChild as DropdownElementWithComponent).component as DropdownWithItemQuantityList,
  dropdownExpandedClearApply: (document.querySelector(
    '.form-elements-layout__dropdown-expanded-clear-apply'
  )?.firstElementChild as DropdownElementWithComponent).component as DropdownWithItemQuantityList,
};

components.dropdownExpandedPlural.getExpandableItemComponent().open();
components.dropdownExpandedApply.getExpandableItemComponent().open();
components.dropdownExpandedClearApply.getExpandableItemComponent().open();
