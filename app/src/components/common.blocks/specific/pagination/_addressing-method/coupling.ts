import BEMModifier from '@shared/utils/scripts/components/BEM/BEMModifier';

import type { Pagination } from '../pagination';

abstract class PaginationAddressingMethodModifier extends BEMModifier<Pagination> {
  constructor(pagination: Pagination) {
    super(pagination, 'paginationAddressingMethodModifier');
  }
}

export type { Pagination };

export { PaginationAddressingMethodModifier as default };
