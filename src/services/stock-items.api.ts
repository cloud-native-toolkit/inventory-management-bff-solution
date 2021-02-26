import {StockItemModel} from '../models';

export abstract class StockItemsApi {
  abstract listStockItems(): Promise<StockItemModel[]>;
}
