import {Container, Scope} from 'typescript-ioc';
import {TaskApi} from './task.api';
import {TaskService} from './task.service';
import {ProjectApi} from './project.api';
import {ProjectService} from './project.service';
import {StockItemsApi} from './stock-items.api';
import {StockItemsService} from './stock-items.service';

export * from './project.api';
export * from './task.api';
export * from './stock-items.api';

Container.bind(TaskApi).to(TaskService).scope(Scope.Singleton);
Container.bind(ProjectApi).to(ProjectService).scope(Scope.Singleton);
Container.bind(StockItemsApi).to(StockItemsService);
