import Base from '../-base';
import { assign } from '@ember/polyfills';

const types = Object.freeze({
  stage: [
    'position',
    'zoom'
  ],
  node: [
    // 'drag',
    // 'move',
    'hover',
    // 'remove',
    // 'resize',
    // 'select'
  ]
});

export default Base.extend({

  create(owner) {
    return this.model('stage/actions', { owner });
  },

  actions(type, props) {
    return this.model(`stage/actions/${type}`, assign({ type, types: types[type] }, props));
  },

  action(type, owner, props) {
    return this.model(`stage/actions/${owner.type}/${type}`, assign({ type, owner }, props));
  }

});
