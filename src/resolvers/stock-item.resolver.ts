import {Query, Resolver} from 'type-graphql';
import {Inject} from 'typescript-ioc';

import {resolverManager} from './_resolver-manager';
import {StockItem} from '../schemas';
import {StockItemModel} from '../models';
import {StockItemsApi} from '../services';

@Resolver(of => StockItem)
export class StockItemResolver {
  @Inject
  service: StockItemsApi;

  @Query(returns => [StockItem])
  async stockItems(): Promise<StockItemModel[]> {
    return this.service.listStockItems();
  }
}

resolverManager.registerResolver(StockItemResolver);
