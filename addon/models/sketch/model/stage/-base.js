import Base from '../../-base';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { array } from '../../../../util/computed';
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

  parentNodeForModel(model) {
    let parent = model.parent;
    return parent && parent.node;
  },

  _addNode(model) {
    let node = model.node;
    assert(`model.node must return node for '${model}'`, !!node);

    let parent = this.parentNodeForModel(model);
    if(!parent) {
      parent = this.stage;
    }

    parent.nodes.addNode(node);
    this.nodes.pushObject(node);
  },

  //

  onModelUpdated(model) {
    let node = this.nodeForModel(model);
    if(node) {
      node.remove();
      model._unsetNode();
      this.nodes.removeObject(node);
    }
    this._addNode(model);
  },

  onModelAdded(model) {
    this._addNode(model);
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
