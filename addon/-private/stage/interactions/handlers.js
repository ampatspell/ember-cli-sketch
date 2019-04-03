import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import sketches from '../../util/sketches';
import { A } from '@ember/array';

const all = () => computed(function() {
  let factory = sketches(this).factory;
  return A(this.types.map(type => factory.interactionHandler(type, this)));
}).readOnly();

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
