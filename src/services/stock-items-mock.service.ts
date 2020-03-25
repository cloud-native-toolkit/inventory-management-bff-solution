import {StockItemsApi} from './stock-items.api';
import {StockItemModel} from '../models';

export class StockItemsMockService implements StockItemsApi {
  async listStockItems(): Promise<StockItemModel[]> {
    return [
      {
        id: "1",
        name: "Self-sealing stem bolt",
        description: "Self-sealing stem bolt",
        stock: 10,
        unitPrice: 10.5,
        picture: "https://via.placeholder.com/32.png",
        manufacturer: "Bajor Galactic"
      },
      {
        id: "2",
        name: "Heisenberg compensator",
        description: "Magical component that negates the effects of the Heisenberg Uncertainty Principle",
        stock: 20,
        unitPrice: 20.0,
        picture: "https://via.placeholder.com/32.png",
        manufacturer: "Federation Imports"
      },
      {
        id: "3",
        name: "Tooth sharpener",
        description: "Industrial strength tooth sharpener",
        stock: 30,
        unitPrice: 5.25,
        picture: "https://via.placeholder.com/32.png",
        manufacturer: "Farenginar Exploits"
      }
    ];
  }
}
