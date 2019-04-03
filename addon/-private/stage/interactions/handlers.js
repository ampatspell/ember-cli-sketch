import EmberObject from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { A } from '@ember/array';
import { factory } from '../../util/computed';

const all = () => factory((factory, handlers) => {
  return A(handlers.types.map(type => factory.interactionHandler(type, handlers)));
});

export default EmberObject.extend({

  interactions: null,
  types: null,

  stage: readOnly('interations.stage'),
  mouse: readOnly('interactions.mouse'),
  keyboard: readOnly('interactions.keyboard'),

  all: all(),

  onEvent(event, ...args) {
    this.all.find(handler => {
      let result = handler[event].call(handler, ...args);
      if(result === false) {
        return true;
      }
    });
  }

});
