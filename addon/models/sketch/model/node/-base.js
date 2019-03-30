import Base from '../../-base';
import { computed } from '@ember/object';

export default Base.extend({

  stage: null,
  object: null,

  node: computed(function() {
    let node = this._node;
    if(!node) {
      node = this._createNode();
      this._node = node;
    }
    return node;
  }).readOnly(),

  nodeProperties() {
    let { type, x, y, width, height, rotation } = this; // Temporary
    return { type, properties: { frame: { x, y, width, height, rotation } } };
  },

  _createNode() {
    let { type, properties } = this.nodeProperties();
    return this.stage._createNode(this, type, properties);
  }

});
