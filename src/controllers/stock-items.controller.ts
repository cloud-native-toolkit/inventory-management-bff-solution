import {Inject, ObjectFactory, BuildContext, Factory} from 'typescript-ioc';
import {GET, Path} from 'typescript-rest';
import {HttpError} from 'typescript-rest/dist/server/model/errors';
import {Span} from 'opentracing';
import {getNamespace} from 'cls-hooked';

import {StockItemModel} from '../models';
import {StockItemsApi} from '../services';
import {LoggerApi} from '../logger';
import {TracerApi} from '../tracer';
import {TraceConstants} from '../util/trace-constants';
import {buildTraceContextFromSpan} from '../util/opentracing/express-middleware';

class BadGateway extends HttpError {
  constructor(message?: string) {
    super("BadGateway", message);
    this.statusCode = 502;
  }
}

@Path('stock-items')
export class StockItemsController {
  @Inject
  service: StockItemsApi;
  @Inject
  _logger: LoggerApi;

  get logger(): LoggerApi {
    return this._logger.child('StockItemsController');
  }

  @GET
  async listStockItems(): Promise<StockItemModel[]> {
    this.logger.info('Request for stock items');

    try {
      const stockItems = this.service.listStockItems();

      this.logger.debug('Got stock items: ', stockItems);

      return stockItems;
    } catch (err) {
      this.logger.error('Error getting stockItems: ', err);

      throw new BadGateway('There was an error');
    }
  }
}
