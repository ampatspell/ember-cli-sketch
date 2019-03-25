import Base from './-base';
import { assign } from '@ember/polyfills';
import { frame, FrameMixin } from './frame/-base';
import { self, constrainedNumber } from '../../util/computed';
import { nodes } from './nodes';
import { interactions } from './stage/interactions';
import { actions } from './stage/actions';
import { hover } from './stage/hover';
import { selection } from './stage/selection';
import { dragging } from './stage/dragging';
import { resizing } from './stage/resizing';
import { renderer } from './stage/renderer';

const zoom = () => constrainedNumber({
  initial: 1,
  min: 0,
  max: 10,
  decimals: 2
});

export default Base.extend(FrameMixin, {

  isStage: true,
  stage: self(),

  frame: frame('stage'),
  zoom: zoom(),
  nodes: nodes(),

  interactions: interactions(),
  actions: actions(),
  hover: hover(),
  selection: selection(),
  dragging: dragging(),
  resizing: resizing(),
  renderer: renderer(),

  reset() {
    this.setProperties({
      'zoom': 1,
      'frame.x': 0,
      'frame.y': 0
    });
  },

  center(opts={}) {
    let { renderer: { size }, zoom, nodes: { frame: { zoomedBounds: bounds } } } = this;

    if(!size) {
      return;
    }

    let dimension = (dimensionKey, sizeKey) => {
      let value = opts[dimensionKey];
      if(value) {
        return value;
      }
      return ((size[sizeKey] / 2) - (bounds[sizeKey] / 2)) / zoom;
    }

    let position = {
      x: dimension('x', 'width'),
      y: dimension('y',  'height')
    };

    this.frame.update(position);
  },

  fit(opts={}) {
    let { offset } = assign({ offset: 10 }, opts);
    let { renderer: { size }, nodes: { frame: { bounds } } } = this;

    if(!size) {
      return;
    }

    let value = dimension => (size[dimension] - (offset * 2)) / bounds[dimension];

    let zoom = Math.min(value('width'), value('height'));
    this.setProperties({ zoom });

    this.center();
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

  handle(action) {
    action.perform();
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

    if(node.isGroup) {
      // TODO: move group
      // group.frame.absolute is parent absolute
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

    let frame = target.frame.convertFrameFromAbsolute(node.frame.absolute);
    let selected = node.isSelected;

    if(selected) {
      node.deselect();
    }

    node.remove();
    node.frame.update(frame);
    target.nodes.addNode(node);

    if(selected) {
      node.select({ replace: false });
    }

    return true;
  },

  moveNodesToContainedAreas(nodes) {
    return nodes.filter(node => this.moveNodeToContainedArea(node));
  }

});
