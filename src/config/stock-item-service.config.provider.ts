import {ObjectFactory} from 'typescript-ioc';

const baseUrl: string = process.env.SERVICE_URL || 'localhost:9080';

export const stockItemConfigFactory: ObjectFactory = () => ({
  baseUrl,
});
