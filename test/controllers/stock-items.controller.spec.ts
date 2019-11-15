import {Application} from 'express';
import * as request from 'supertest';

import {buildApiServer} from '../helper';

describe('stock-item.controller', () => {

  let app: Application;
  beforeEach(async () => {
    const apiServer = buildApiServer();

    app = await apiServer.getApp();
  });

  test('canary verifies test infrastructure', () => {
    expect(true).toEqual(true);
  });

  describe('given GET /stock-items', () => {
    describe('when service is successful', () => {
      test('then return 200 status', async () => {
        return request(app).get('/stock-items').expect(200);
      });

      test('then should return an empty array', async () => {
        return request(app).get('/stock-items').expect([]);
      });
    });
  });
});
