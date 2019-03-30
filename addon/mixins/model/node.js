import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { sketches } from '../../services/sketches';
import { assign } from '@ember/polyfills';

export default Mixin.create({

  node: computed(function() {
    let node = this._node;
    if(!node) {
      node = this._createNode();
      this._node = node;
    }
    return node;
  }).readOnly(),

  _createNode() {
    let { type, properties } = this.createNode();
    return sketches(this).factory.stage.node.create(type, assign({ model: this }, properties));
  }

});
