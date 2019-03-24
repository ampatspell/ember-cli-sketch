import Base, { factory } from './-base';
import { assign } from '@ember/polyfills';

export default Base.extend({

  create(props) {
    return this.model('stage', props);
  },

  interactions: factory('stage/interactions'),
  actions: factory('stage/actions'),

  frame(type, owner) {
    return this.model(`frame/${type}`, { owner });
  },

  nodes(owner) {
    return this.model(`nodes`, { owner });
  },

  node(type, props) {
    return this.model(`node/${type}`, assign({ type }, props));
  },

  position(owner) {
    return this.model('stage/position', { owner });
  },

  resizing(owner) {
    return this.model('stage/resizing', { owner });
  },

  selection(owner) {
    return this.model('stage/selection', { owner });
  },

  dragging(owner) {
    return this.model('stage/dragging', { owner });
  },

  hover(owner) {
    return this.model('stage/hover', { owner });
  },

  renderer(owner) {
    return this.model('stage/renderer', { owner });
  },

  constraints(owner) {
    return this.model('stage/constraints', { owner });
  },

  constraint(owner, opts) {
    return this.model('stage/constraint', { owner, opts });
  }

});
