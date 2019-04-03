import EmberObject from '@ember/object';
import { bool } from '@ember/object/computed';

export default EmberObject.extend({

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
    this.setProperties({ isActive: false });
    return !!node;
  },

  reset() {
    this.end();
  }

});
