import Base from '../../-base';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { array } from '../../../../util/computed';
import { assign } from '@ember/polyfills';
import { assert } from '@ember/debug';

export default Base.extend({

  sketches: service(),

  stage: computed(function() {
    return this.sketches.factory.stage.create();
  }).readOnly(),

  nodes: array(),

  nodeForModel(model) {
    return this.nodes.findBy('model', model);
  },

  //

  nodeModelTypeForObject() {
    assert(`override nodeModelTypeForObject and don't call super`, false);
  },

  createModel(object) {
    let type = this.nodeModelTypeForObject(object);
    return this.sketches.factory.model.node(this, type, object);
  },

  createModels(objects) {
    return objects.map(object => this.createModel(object));
  },

  //

  _createNode(model, type, properties) {
    return this.sketches.factory.stage.node.create(type, assign({ model }, properties));
  },

  onModelAdded(model) {
    let node = model.node;
    // Parent
    this.stage.nodes.addNode(node);
    this.nodes.pushObject(node);
  },

  onModelsAdded(models) {
    models.forEach(model => this.onModelAdded(model));
  },

  onModelRemoved(model) {
    let node = this.nodeForModel(model);
    if(node) {
      node.remove();
    }
  },

  onModelsRemoved(models) {
    models.forEach(model => this.onModelRemoved(model));
  }

});
