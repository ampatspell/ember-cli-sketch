import Base from './-base';
import { readOnly } from '@ember/object/computed';
import { assign } from '@ember/polyfills';
import { frame, FrameMixin } from './frame/-base';
import { self } from '../../util/computed';
import { nodes } from './nodes';
import { interactions } from './stage/interactions';
import { hover } from './stage/hover';
import { selection } from './stage/selection';
import { dragging } from './stage/dragging';
import { resizing } from './stage/resizing';
import { renderer } from './stage/renderer';

export const model = key => readOnly(`model.${key}`);

export default Base.extend(FrameMixin, {

  isStage: true,
  isContainer: true,
  stage: self(),

  model: null,

  frame: frame('stage'),
  zoom: model('zoom'),
  nodes: nodes(),

  interactions: interactions(),
  hover: hover(),
  selection: selection(),
  dragging: dragging(),
  resizing: resizing(),
  renderer: renderer(),

  reset() {
    this.update({
      x: 0,
      y: 0,
      zoom: 1
    });
  },

  _frameForOptions(opts) {
    let { type } = opts;
    if(!type) {
      return this.nodes.frame;
    } else if(type === 'areas') {
      return this.nodes.areas.frame;
    }
  },

  center(opts={}) {
    opts = assign({}, opts);

    let { renderer: { size }, zoom } = this;

    if(!size) {
      return;
    }

    let frame = this._frameForOptions(opts);
    if(!frame) {
      return;
    }

    let bounds = frame.hover;

    let dimension = (dimensionKey, sizeKey) => {
      let value = opts[dimensionKey];
      if(value) {
        return value;
      }
      return ((size[sizeKey] / 2) - (bounds[sizeKey]  / 2) - bounds[dimensionKey]) / zoom;
    }

    let position = {
      x: dimension('x', 'width'),
      y: dimension('y',  'height')
    };

    this.update(position);
  },

  fit(opts={}) {
    opts = assign({ offset: 10 }, opts);
    let { renderer: { size } } = this;

    if(!size) {
      return;
    }

    let frame = this._frameForOptions(opts);
    if(!frame) {
      return;
    }

    let bounds = frame.absoluteBounds;

    let value = dimension => (size[dimension] - (opts.offset * 2)) / bounds[dimension];

    let zoom = Math.min(value('width'), value('height'));

    this.update({ zoom });
    this.center({ type: opts.type });
  },

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

  willRemoveNode(node) {
    let { hover, selection, dragging, resizing } = this;
    let nodes = node.allNodes();
    hover.willRemoveNodes(nodes);
    selection.willRemoveNodes(nodes);
    dragging.willRemoveNodes(nodes);
    resizing.willRemoveNodes(nodes);
  },

  didRemoveNode() {
  },

  //

  update(props) {
    this.model.update(props);
  },

  handle(action) {
    this.model.handle(action);
  },

  //

  containsNode(node) {
    let { nodes } = this;
    if(nodes) {
      return nodes.containsNode(node);
    }
  },

  //

  moveNodeToContainedArea(node) {
    if(node.isStage || node.isArea) {
      return;
    }

    let target = this.nodes.areas.find(area => {
      return area.frame.overlapsFrame(node.frame.absoluteBounds, 'absoluteBounds');
    });

    if(target) {
      if(node.area === target) {
        return;
      }
    } else if(node.parent === this) {
      return;
    } else {
      target = this;
    }

    return node.moveToParent(target);
  },

  moveNodesToContainedAreas(nodes) {
    return nodes.filter(node => this.moveNodeToContainedArea(node));
  }

});
