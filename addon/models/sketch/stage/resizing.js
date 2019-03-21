import Base from '../-base';
import { computed } from '@ember/object';
import { bool } from '@ember/object/computed';
import { sketches } from '../../../services/sketches';

export const resizing = () => computed(function() {
  return sketches(this).factory.stage.resizing(this);
}).readOnly();

export default Base.extend({

  owner: null,
  node: null,
  edge: null,
  active: false,
  bound: bool('node'),

  _deselectNodes() {
    let { owner: { selection }, node } = this;
    let nodes = selection.filter(selection => selection !== node);
    selection.removeNodes(nodes);
  },

  bind(node, edge) {
    if(this.node === node && this.active) {
      return;
    }
    this.setProperties({ node, edge });
  },

  unbind() {
    if(this.active) {
      return;
    }
    this.setProperties({ node: null, edge: null });
  },

  begin() {
    if(!this.bound) {
      return;
    }
    this.setProperties({ active: true });
    this._deselectNodes();
  },

  end() {
    this.setProperties({ active: false, node: null, edge: null });
  },

  reset() {
    this.end();
  },

  willRemoveNode(node) {
    if(this.node === node) {
      this.end();
    }
  }

});
