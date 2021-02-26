import superagent = require('superagent');
import {Span, Tracer} from 'opentracing';
import {opentracingPlugin} from './superagent-plugin';

export default function superagentWrapper(context: {tracer?: Tracer, span?: Span} = {}) {
  return {
    delete: (url: string): superagent.Request => {
      return superagent.delete(url).use(opentracingPlugin(this.context));
    },

    get: (url: string): superagent.Request => {
      return superagent.get(url).use(opentracingPlugin(this.context));
    },

    patch: (url: string): superagent.Request => {
      return superagent.patch(url).use(opentracingPlugin(this.context));
    },

    post: (url: string): superagent.Request => {
      return superagent.post(url).use(opentracingPlugin(this.context));
    },

    put: (url: string): superagent.Request => {
      return superagent.put(url).use(opentracingPlugin(this.context));
    }
  };
}
