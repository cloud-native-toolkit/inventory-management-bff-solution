import {Container, ObjectFactory} from 'typescript-ioc';
import {initTracerFromEnv, JaegerTracer, TracingConfig, TracingOptions} from 'jaeger-client'
import {globalTracer, initGlobalTracer, Tracer} from 'opentracing';

import {LoggerApi} from '../logger';

const packageConfig = require('../../package.json');

let tracer: Tracer;
function initTracer(): Tracer {
  const tags = {};
  tags[`${packageConfig.name}.version`] = packageConfig.version;

  const logger: LoggerApi = Container.get(LoggerApi);

  const config: TracingConfig = {
    serviceName: packageConfig.name,
    reporter: {
      logSpans: true
    }
  };
  const options: TracingOptions = {
    tags,
    logger,
  };

  tracer = initTracerFromEnv(config, options);

  initGlobalTracer(tracer);

  return tracer;
}

const jaegerTracerFactory: ObjectFactory = () => {
  if (!tracer) {
    tracer = initTracer();
  }

  return tracer;
}

export default jaegerTracerFactory;
