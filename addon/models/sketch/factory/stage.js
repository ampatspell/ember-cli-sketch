import Base, { factory } from './-base';

export default Base.extend({

  create(props) {
    return this.model('stage', props);
  },

  interactions: factory('stage/interactions'),

  frame(type, owner) {
    return this.model(`frame/${type}`, { owner });
  },

  position() {
    return this.model('stage/position');
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
  }

});
