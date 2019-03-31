import Base, { factory } from './-base';

export default Base.extend({

  interactions: factory('stage/interactions'),

  create(model) {
    return this._model('stage', { model });
  },

  node(type, model) {
    return this._model(`node/${type}`, { type, model });
  },

  frame(type, owner) {
    return this._model(`frame/${type}`, { owner });
  },

  nodes(owner) {
    return this._model(`nodes`, { owner });
  },

  typed(type, owner) {
    return this._model(`nodes/${type}`, { owner });
  },

  position(owner) {
    return this._model('stage/position', { owner });
  },

  resizing(owner) {
    return this._model('stage/resizing', { owner });
  },

  selection(owner) {
    return this._model('stage/selection', { owner });
  },

  dragging(owner) {
    return this._model('stage/dragging', { owner });
  },

  hover(owner) {
    return this._model('stage/hover', { owner });
  },

  renderer(owner) {
    return this._model('stage/renderer', { owner });
  },

  constraints(owner) {
    return this._model('stage/constraints', { owner });
  },

  constraint(owner, opts) {
    return this._model('stage/constraint', { owner, opts });
  }

});
