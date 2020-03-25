import {Application} from 'express';
import * as request from 'supertest';
import {Container} from 'typescript-ioc';

import {buildApiServer} from '../helper';
import Mock = jest.Mock;
import {StockItemsApi} from '../../src/services';

describe('stock-item.controller', () => {

  let app: Application;
  let service_listStockItems: Mock;

  beforeEach(async () => {
    service_listStockItems = jest.fn();
    Container.bind(StockItemsApi).factory(
      () => ({
        listStockItems: service_listStockItems
      }),
    );

    const apiServer = buildApiServer();

    app = await apiServer.getApp();
  });

  test('canary verifies test infrastructure', () => {
    expect(true).toEqual(true);
  });

  describe('given GET /stock-items', () => {
    describe('when service is successful', () => {
      const expectedResult = [{value: 'val'}];
      beforeEach(() => {
        service_listStockItems.mockResolvedValue(expectedResult);
      });

      test('then return 200 status', async () => {
        return request(app).get('/stock-items').expect(200);
      });

      test('then should return value from service', async () => {
        return request(app).get('/stock-items').expect(expectedResult);
      });
    });

    describe('when service fails', () => {
      beforeEach(() => {
        service_listStockItems.mockRejectedValue(new Error('service failed'));
      });

      test('then return 502 error', async () => {
        return request(app).get('/stock-items').expect(502);
      });
    });
  });
});
