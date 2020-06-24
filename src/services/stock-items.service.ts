import {BuildContext, Factory, Inject, ObjectFactory} from 'typescript-ioc';
import {get, Response} from 'superagent';

import {StockItemsApi} from './stock-items.api';
import {StockItemModel} from '../models';
import {StockItemServiceConfig} from '../config';
import {LoggerApi} from '../logger';
import {opentracingPlugin} from '../util/opentracing/superagent-plugin';
import {TracerApi} from '../tracer';
import {getNamespace} from 'cls-hooked';
import {TraceConstants} from '../util/trace-constants';
import {Span} from 'opentracing';
import {buildTraceContextFromSpan} from '../util/opentracing/express-middleware';

export class BackendStockItem {
  'id'?: string;
  'manufacturer'?: string;
  'name'?: string;
  'price'?: number;
  'stock'?: number;
}

export class StockItemsService implements StockItemsApi {
  @Inject
  _logger: LoggerApi;
  @Inject
  config: StockItemServiceConfig;
  @Inject
  tracer: TracerApi;

  get logger(): LoggerApi {
    return this._logger.child('StockItemsService');
  }

  async listStockItems(): Promise<StockItemModel[]> {

    this.logger.info('Listing stock items');

    try {
      const response: Response = await get(this.config.baseUrl + '/stock-items')
        .use(opentracingPlugin({tracer: this.tracer}))
        .set('Accept', 'application/json');

      return this.mapStockItems(response.body);
    } catch (err) {
      this.logger.error('Error getting data from service', err);
      throw err;
    }
  }

  mapStockItems(data: BackendStockItem[]): StockItemModel[] {
    return data.map(this.mapStockItem);
  }

  mapStockItem(item: BackendStockItem): StockItemModel {
    return {
      id: item.id,
      name: item.name,
      description: item.name,
      stock: item.stock,
      unitPrice: item.price,
      picture: 'https://via.placeholder.com/32.png',
      manufacturer: item.manufacturer,
    };
  }
}
