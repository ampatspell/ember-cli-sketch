import EmberObject from '@ember/object';
import { factory } from '../util/computed';

const all = () => factory((factory, tools) => tools.types.map(type => factory.tool(type, tools)));

export default EmberObject.extend({

  stage: null,
  types: null,

  all: all(),

  reset() {
  }

});
