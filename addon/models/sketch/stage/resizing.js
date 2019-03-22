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

  isBound: bool('node'),
  isActive: false,

  bind(node, edge) {
    if(this.node === node && this.isActive) {
      return;
    }
    this.setProperties({ node, edge });
  },

  unbind() {
    if(this.isActive) {
      return;
    }
    this.setProperties({ isActive: false, node: null, edge: null });
  },

  begin() {
    if(!this.isBound) {
      return false;
    }
    this.setProperties({ isActive: true });
    return true;
  },

  end() {
    let { node } = this;
    this.setProperties({ isActive: false, node: null, edge: null });
    return !!node;
  },

  reset() {
    this.end();
  },

  willRemoveNodes(nodes) {
    if(nodes.find(node => this.node === node)) {
      this.end();
    }
  }

});
