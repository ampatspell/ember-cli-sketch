import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { sketches } from '../../services/sketches';

export default Mixin.create({

  _node: null,

  node: computed(function() {
    let node = this._node;
    if(!node) {
      node = this._createNode();
      this._node = node;
    }
    return node;
  }).readOnly(),

  nodeType: readOnly('type'),

  _createNode() {
    let type = this.nodeType;
    return sketches(this).factory.stage.node(type, this);
  },

  _unsetNode() {
    let node = this._node;
    if(!node) {
      return;
    }
    this._node = null;
    this.notifyPropertyChange('node');
  }

});
