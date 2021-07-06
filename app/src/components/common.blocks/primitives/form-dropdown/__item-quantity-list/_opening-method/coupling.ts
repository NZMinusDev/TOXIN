import { PluginDecorator } from '@utils/devTools/scripts/PluginCreationHelper';
import { Unpacked } from '@utils/devTools/scripts/TypingHelper';

import IQLists from '../form-dropdown__item-quantity-list';

type IQList = Unpacked<typeof IQLists>;

abstract class IQListOpeningMethodModifier extends PluginDecorator<IQList> {
  constructor(iqList: IQList) {
    super(iqList, 'IQListOpeningMethodModifier');
  }
}

export { IQListOpeningMethodModifier as default };
