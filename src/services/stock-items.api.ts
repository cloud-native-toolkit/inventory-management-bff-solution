import {StockItemModel} from '../models';

export abstract class StockItemsApi {
  async abstract listStockItems(): Promise<StockItemModel[]>;
}
