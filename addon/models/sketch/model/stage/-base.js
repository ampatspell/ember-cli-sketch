import Base from '../../-base';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { array } from '../../../../util/computed';
import { assert } from '@ember/debug';

export default Base.extend({

  sketches: service(),

  stage: computed(function() {
    return this.sketches.factory.stage.create({ model: this });
  }).readOnly(),

  nodes: array(),

  nodeForModel(model) {
    return this.nodes.findBy('model', model);
  },

  parentNodeForModel(model) {
    let parent = model.parent;
    if(!parent) {
      return this.stage;
    }
    return parent.node;
  },

  _moveNode(node, target) {
    this._suppressUpdates = node.model;
    this.moveModel(node.model, target.model);
    this._suppressUpdates = null;
  },

  _removeNode(node) {
    this.removeModel(node.model);
  },

  _addNodeForModel(model) {
    // TODO: child nodes
    let node = model.node;
    assert(`model.node must return node for '${model}'`, !!node);
    let parent = this.parentNodeForModel(model);
    parent.nodes.addNode(node);
    this.nodes.pushObject(node);
  },

  _removeNodeForModel(model) {
    let node = this.nodeForModel(model);
    if(!node) {
      return;
    }
    // TODO: child nodes
    node._remove();
    model._unsetNode();
    this.nodes.removeObject(node);
  },

  //

  onModelUpdated(model) {
    // TODO: on remove this is called for all models. parent is recomputed
    if(this._suppressUpdates === model) {
      return;
    }
    this._removeNodeForModel(model);
    this._addNodeForModel(model);
  },

  onModelAdded(model) {
    this._addNodeForModel(model);
  },

  onModelsAdded(models) {
    models.forEach(model => this.onModelAdded(model));
  },

  onModelRemoved(model) {
    this._removeNodeForModel(model);
  },

  onModelsRemoved(models) {
    models.forEach(model => this.onModelRemoved(model));
  }

});
