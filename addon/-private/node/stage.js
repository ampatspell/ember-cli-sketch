import create, { frame } from './-base';
import { zoom, factory, self } from '../util/computed';
import { assert } from '@ember/debug';
import { readOnly, and } from '@ember/object/computed';

const model = name => factory((factory, stage) => factory[name].call(factory, stage));

export default opts => create(opts).extend({

  type: 'stage',

  isStage: true,
  isContainer: true,
  isAttached: true,
  isVisible: true,

  stage: self(),

  frame: frame('stage'),
  zoom:  zoom('model.zoom'),

  renderer:     model('renderer'),
  interactions: model('interactions'),
  hover:        model('hover'),
  selection:    model('selection'),
  tools:        model('tools'),
  cursor:       model('cursor'),
  guidelines:   model('guidelines'),

  isSelectable: and('isAttached', '_selectable'),

  recursive: readOnly('nodes.recursive'),

  //

  attach() {
    this.renderer.attach(...arguments);
  },

  detach() {
    let { renderer, interactions, hover, selection, tools } = this;
    renderer.detach(...arguments);
    interactions.reset();
    hover.reset();
    selection.reset();
    tools.reset();
  },

  //

  focus() {
    this.renderer.focus();
  },

  //

  handle(action) {
    assert(`handle is required for ${this.model}`, !!this.model.handle);
    this.model.handle(action);
  },

  nodesPerform(nodes, name, ...args) {
    if(!nodes) {
      return;
    }
    nodes = nodes.slice();
    let actions = this.sketches.actions;
    return nodes.map(node => actions.perform(name, node, ...args));
  },

  nodesForPosition(position, type) {
    return this.nodes.nodesForPosition(position, type);
  }

});
