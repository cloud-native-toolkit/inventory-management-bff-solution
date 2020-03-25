import {join, resolve} from 'path';
import {Container} from 'typescript-ioc';
import {Matchers, Pact} from '@pact-foundation/pact';

import {StockItemsApi} from '../../src/services';
import {StockItemServiceConfig} from '../../src/config';
import {BackendStockItem} from '../../src/services/stock-items.service';

const npmPackage = require(join(process.cwd(), 'package.json'));

const consumerName = npmPackage.name;

describe('stock-items.service', () => {
  test('canary verifies test infrastructure', () => {
    expect(true).toEqual(true);
  });

  const port = 1235;
  let provider: Pact;
  beforeAll(() => {
    provider = new Pact({
      consumer: consumerName,
      provider: 'inventory-management-svc',
      port,
      log: resolve(process.cwd(), "logs", "pact.log"),
      dir: resolve(process.cwd(), "pacts"),
    });

    return provider.setup();
  });

  let classUnderTest: StockItemsApi;
  beforeEach(() => {
    Container.bind(StockItemServiceConfig).factory(() => ({
        baseUrl: `http://localhost:${port}`
      }));

    classUnderTest = Container.get(StockItemsApi);
  });

  afterAll(() => {
    return provider.finalize();
  });

  context('given listStockItems()', () => {
    context('when called', () => {
      const expectedResult: BackendStockItem = {
        id: '1234',
        manufacturer: 'My manufacturer',
        name: 'product name',
        price: 20.0,
        stock: 1000
      };

      beforeEach(() => {
        return provider.addInteraction({
          state: 'base state',
          uponReceiving: 'a request for stock items',
          withRequest: {
            method: 'GET',
            path: '/stock-items',
            headers: {
              'Accept': 'application/json',
            }
          },
          willRespondWith: {
            status: 200,
            headers: {
              'Content-Type': 'application/json'
            },
            body: Matchers.eachLike(expectedResult),
          }
        });
      });

      test('should return inventory data', async () => {
        const result = await classUnderTest.listStockItems();

        expect(result).toEqual([{
          id: expectedResult.id,
          name: expectedResult.name,
          description: expectedResult.name,
          stock: expectedResult.stock,
          unitPrice: expectedResult.price,
          manufacturer: expectedResult.manufacturer,
          picture: 'https://via.placeholder.com/32.png',
        }]);
      });

      afterEach(() => {
        return provider.verify();
      });
    });
  });
});