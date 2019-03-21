import Base from '../../-base';
import { defineProperty, computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { sketches } from '../../../../services/sketches';
import { A } from '@ember/array';
import { camelize } from '@ember/string';

const all = () => computed(function() {
  let service = sketches(this);
  return A(this.types.map(type => service.factory.stage.interactions.handler(type, this)));
}).readOnly();

const property = type => computed('all.@each.type', function() {
  return this.all.findBy('type', type);
}).readOnly();

export default Base.extend({

  owner: null,
  types: null,

  stage: readOnly('owner.owner'),
  mouse: readOnly('owner.mouse'),
  keyboard: readOnly('owner.keyboard'),

  all: all(),

  prepare(props) {
    this._super(...arguments);
    props.types.forEach(type => defineProperty(this, camelize(type), property(type)));
  },

  onEvent(event, ...args) {
    this.all.find(handler => {
      let result = handler[event].call(handler, ...args);
      if(result === false) {
        return true;
      }
    });
  }

});
