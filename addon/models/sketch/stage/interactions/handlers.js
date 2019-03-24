import Base from '../../-base';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { sketches } from '../../../../services/sketches';
import { A } from '@ember/array';

const all = () => computed(function() {
  let service = sketches(this);
  return A(this.types.map(type => service.factory.stage.interactions.handler(type, this)));
}).readOnly();

export default Base.extend({

  owner: null,
  types: null,

  stage: readOnly('owner.owner'),
  mouse: readOnly('owner.mouse'),
  keyboard: readOnly('owner.keyboard'),

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
