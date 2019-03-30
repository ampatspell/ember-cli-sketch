import Base, { factory } from './-base';

export default Base.extend({

  interactions: factory('stage/interactions'),

  create(props) {
    return this.model('stage', props);
  },

  frame(type, owner) {
    return this.model(`frame/${type}`, { owner });
  },

  nodes(owner) {
    return this.model(`nodes`, { owner });
  },

  typed(type, owner) {
    return this.model(`nodes/${type}`, { owner });
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
