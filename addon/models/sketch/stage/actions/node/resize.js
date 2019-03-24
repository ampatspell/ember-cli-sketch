import Action from '../-action';
import { readOnly } from '@ember/object/computed';

export default Action.extend({

  resizing: readOnly('stage.resizing'),
  selection: readOnly('stage.selection'),

  node: readOnly('resizing.node'),
  edge: readOnly('resizing.edge'),
  isActive: readOnly('resizing.isActive'),

  begin() {
    let { resizing } = this;

    if(!resizing.begin()) {
      return;
    }

    let { selection, node } = this;
    let nodes = selection.filter(selection => selection !== node);
    selection.removeNodes(nodes);

    return true;
  },

  end() {
    let { resizing } = this;

    if(!resizing.end()) {
      return;
    }

    return true;
},

  update(delta) {
    let { isActive } = this;

    if(!isActive) {
      return;
    }

    let { node, node: { constraints }, edge } = this;

    constraints = {
      vertical: {
        clampSizeDelta: value => value
      },
      horizontal: {
        clampSizeDelta: value => value
      }
    };

    let frame = {};

    if(edge.vertical === 'bottom') {
      let value = constraints.vertical.clampSizeDelta(delta.y);
      frame.height = value;
    } else if(edge.vertical === 'top') {
      let value = constraints.vertical.clampSizeDelta(-delta.y);
      frame.y = -value;
      frame.height = value;
    }

    if(edge.horizontal === 'right') {
      let value = constraints.horizontal.clampSizeDelta(delta.x);
      frame.width = value;
    } else if(edge.horizontal === 'left') {
      let value = constraints.horizontal.clampSizeDelta(-delta.x);
      frame.x = -value;
      frame.width = value;
    }

    node.frame.update(frame, { delta: true });
  }

});
