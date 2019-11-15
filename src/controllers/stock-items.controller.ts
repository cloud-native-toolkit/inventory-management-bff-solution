import {GET, Path} from 'typescript-rest';

@Path('stock-items')
export class StockItemsController {

  @GET
  async listStockItems(): Promise<any[]> {
    return [];
  }
}
