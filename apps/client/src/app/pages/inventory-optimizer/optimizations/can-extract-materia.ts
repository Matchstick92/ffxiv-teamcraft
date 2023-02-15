import { InventoryOptimizer } from './inventory-optimizer';
import { InventoryItem } from '../../../model/user/inventory/inventory-item';
import { UserInventory } from '../../../model/user/inventory/user-inventory';
import { Injectable } from '@angular/core';
import { LazyDataFacade } from '../../../lazy-data/+state/lazy-data.facade';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ExtractRow, LazyDataKey } from '@ffxiv-teamcraft/types';

@Injectable()
export class CanExtractMateria extends InventoryOptimizer {

  constructor(private lazyData: LazyDataFacade) {
    super();
  }

  _getOptimization(item: InventoryItem, inventory: UserInventory, data: ExtractRow): Observable<{ [p: string]: number | string } | null> {
    return this.lazyData.getRow('extractableItems', item.itemId).pipe(
      map(extractable => {
        if (item.spiritBond === 10000 && extractable === 1) {
          return {};
        }
        return null;
      })
    );
  }

  getId(): string {
    return 'CAN_EXTRACT_MATERIA';
  }

  lazyDataEntriesNeeded(): LazyDataKey[] {
    return ['extractableItems'];
  }
}
