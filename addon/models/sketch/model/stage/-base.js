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

  parentNodeForModel(model) {
    let parent = model.parent;
    return parent && parent.node;
  },

  //

  onModelAdded(model) {
    let node = model.node;
    assert(`model.node must return node for '${model}'`, !!node);

    let parent = this.parentNodeForModel(model);
    if(!parent) {
      parent = this.stage;
    }

    parent.nodes.addNode(node);
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
