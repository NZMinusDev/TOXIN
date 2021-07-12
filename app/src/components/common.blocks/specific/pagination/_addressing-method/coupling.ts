import { BEMModifier } from '@utils/devTools/scripts/ComponentCreationHelper';

import { Pagination } from '../pagination';

abstract class PaginationModificatorNameModifier extends BEMModifier<Pagination> {
  constructor(pagination: Pagination) {
    super(pagination, 'paginationModificatorNameModifier');
  }
}

export { PaginationModificatorNameModifier as default, Pagination };
