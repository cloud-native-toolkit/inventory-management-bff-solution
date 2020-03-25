import {StockItemServiceConfig} from './stock-item-service.config';
import {stockItemConfigFactory} from './stock-item-service.config.provider';
import {Container} from 'typescript-ioc';

export * from './stock-item-service.config';

Container.bind(StockItemServiceConfig).factory(stockItemConfigFactory);
