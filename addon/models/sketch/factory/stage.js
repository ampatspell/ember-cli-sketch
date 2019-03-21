import Base, { factory } from './-base';

export default Base.extend({

  create(props) {
    return this.model('stage', props);
  },

  interactions: factory('stage/interactions'),

  frame(type, owner) {
    return this.model(`frame/${type}`, { owner });
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

  areas(owner) {
    return this.model('stage/areas', { owner });
  },

  constraints(owner) {
    return this.model('stage/constraints', { owner });
  },

  constraint(owner, opts) {
    return this.model('stage/constraint', { owner, opts });
  }

});
