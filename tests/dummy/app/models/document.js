import EmberObject, { computed } from '@ember/object';
import NodeMixin from 'ember-cli-sketch/mixins/model/node';

export default EmberObject.extend(NodeMixin, {

  parentId: null,

  parent: computed('parentId', 'documents.all.@each.id', function() {
    let { documents, parentId } = this;
    return documents.all.findBy('id', parentId);
  }).readOnly(),

  id: null,
  type: null,

  createNode() {
    let { type, x, y, width, height, rotation } = this; // Temporary
    return { type, properties: { frame: { x, y, width, height, rotation } } };
  },

  toStringExtension() {
    let { id, type } = this;
    return `${id}:${type}`;
  }

});
