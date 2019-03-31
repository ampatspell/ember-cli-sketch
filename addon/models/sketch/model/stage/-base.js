import Base from '../../-base';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { array } from '../../../../util/computed';
import { assert } from '@ember/debug';

export default Base.extend({

  sketches: service(),

  stage: computed(function() {
    return this.sketches.factory.stage.create(this);
  }).readOnly(),

  models: array(),

  modelsForParent(parent) {
    return this.models.filter(model => model.parent === parent);
  },

  parentNodeForModel(model) {
    let parent = model.parent;
    if(!parent) {
      return this.stage;
    }
    return parent.node;
  },

  _withSuppressedUpdates(cb) {
    this._isUpdatesSuppressed = true;
    try {
      return cb();
    } finally {
      this._isUpdatesSuppressed = false;
    }
  },

  _moveNode(node, target) {
    this._withSuppressedUpdates(() => {
      this.moveModel(node.model, target.model);
    });
  },

  _removeNode(node) {
    this._withSuppressedUpdates(() => {
      this.removeModel(node.model);
    });
  },

  _addNodeForModel(model) {
    // TODO: child models
    let node = model.node;
    assert(`model.node must return node for '${model}'`, !!node);
    let parent = this.parentNodeForModel(model);
    parent.nodes.addNode(node);
  },

  _removeNodeForModel(model) {
    let node = model._node;
    if(!node) {
      return;
    }
    node._remove();
    model._unsetNode();
  },

  //

  onModelUpdated(model) {
    if(this._isUpdatesSuppressed === true) {
      return;
    }
    // TODO: child models
    this._removeNodeForModel(model);
    this._addNodeForModel(model);
  },

  onModelAdded(model) {
    this.models.pushObject(model);
    this._addNodeForModel(model);
  },

  onModelsAdded(models) {
    models.forEach(model => this.onModelAdded(model));
  },

  onModelRemoved(model) {
    this.modelsForParent(model).forEach(model => this.removeModel(model));
    this._removeNodeForModel(model);
    this.models.removeObject(model);
  },

  onModelsRemoved(models) {
    models.forEach(model => this.onModelRemoved(model));
  }

});
