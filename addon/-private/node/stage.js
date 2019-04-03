import create, { frame } from './-base';
import { zoom, model as _model } from '../util/computed';
import { computed } from '@ember/object';
import { assert } from '@ember/debug';
import CenterFitMixin from './stage/center-fit-mixin';

const model = name => _model((factory, stage) => factory[name].call(factory, stage));

const self = () => computed(function() {
  return this;
})

export default opts => create(opts).extend(CenterFitMixin, {

  isStage: true,
  isContainer: true,

  stage: self(),

  frame: frame('stage'),
  zoom:  zoom('model.zoom'),

  renderer:     model('renderer'),
  interactions: model('interactions'),
  hover:        model('hover'),
  dragging:     model('dragging'),
  resizing:     model('resizing'),
  selection:    model('selection'),

  //

  attach() {
    this.renderer.attach(...arguments);
  },

  detach() {
    let { renderer, interactions, hover, selection, dragging, resizing } = this;
    renderer.detach(...arguments);
    interactions.reset();
    hover.reset();
    selection.reset();
    dragging.reset();
    resizing.reset();
  },

  //

  handle(action) {
    assert(`handle is required for ${this.model}`, !!this.model.handle);
    this.model.handle(action);
  },

  nodesForPosition(position, type) {
    return this.nodes.nodesForPosition(position, type);
  },

  //

  moveNodeToOverlappingContainer(node) {
    if(node.isContainer) {
      return;
    }

    // TODO: move

    let target = this.nodes.containers._nodes.find(container => {
      return container !== node && container.frame.overlapsFrame(node.frame.absoluteBounds, 'absoluteBounds');
    });

    if(target) {
      if(node.parent === target) {
        return;
      }
    } else if(node.parent !== this) {
      target = this;
    } else {
      return;
    }

    node.moveTo(target);
    return true;
  },

  moveNodesToOverlappingContainers(nodes) {
    return nodes.filter(node => this.moveNodeToOverlappingContainer(node));
  }

});
