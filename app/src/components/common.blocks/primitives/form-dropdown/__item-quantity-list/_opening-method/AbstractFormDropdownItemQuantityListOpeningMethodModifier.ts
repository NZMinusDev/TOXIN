import BEMModifier from '@shared/utils/scripts/components/BEM/BEMModifier';

import type { FormDropdownItemQuantityList } from '../form-dropdown__item-quantity-list';

abstract class AbstractFormDropdownItemQuantityListOpeningMethodModifier extends BEMModifier<FormDropdownItemQuantityList> {
  constructor(formDropdownItemQuantityList: FormDropdownItemQuantityList) {
    super(
      formDropdownItemQuantityList,
      'formDropdownItemQuantityListOpeningMethodModifier'
    );
  }
}

export type { FormDropdownItemQuantityList };

export { AbstractFormDropdownItemQuantityListOpeningMethodModifier as default };
