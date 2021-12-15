import BEMModifier from '@shared/utils/scripts/components/BEM/BEMModifier';

import type { Pagination } from '../pagination';

abstract class AbstractPaginationAddressingMethodModifier extends BEMModifier<Pagination> {
  constructor(pagination: Pagination) {
    super(pagination, 'paginationAddressingMethodModifier');
  }
}

export type { Pagination };

export { AbstractPaginationAddressingMethodModifier as default };
