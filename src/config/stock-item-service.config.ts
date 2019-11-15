import {Provided, Provider} from 'typescript-ioc';

const baseUrl: string = process.env.SERVICE_URL || 'localhost:9080';

const provider: Provider = {
  get: () => ({
    baseUrl,
  })
};

@Provided(provider)
export class StockItemServiceConfig {
  baseUrl: string;
}
