import EmberObject, { computed } from '@ember/object';
import NodeMixin from 'ember-cli-sketch/mixins/model/node';
import { position, size, rotation } from 'ember-cli-sketch/computed';

export default EmberObject.extend(NodeMixin, {

  parentId: null,

  parent: computed('parentId', 'documents.all.@each.id', function() {
    let { documents, parentId } = this;
    return documents.all.findBy('id', parentId);
  }).readOnly(),

  id: null,
  type: null,

  x:        position('_x', { initial: 0 }),
  y:        position('_y', { initial: 0 }),
  width:    size('_width', { initial: 0 }),
  height:   size('_height', { initial: 0 }),
  rotation: rotation('_rotation', { initial: 0 }),

  update(props) {
    this.setProperties(props);
  },

  toStringExtension() {
    let { id, type } = this;
    return `${id}:${type}`;
  }

});
