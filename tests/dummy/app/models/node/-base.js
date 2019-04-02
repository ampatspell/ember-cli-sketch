import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import node from '../-node';

export {
  node
};

export const doc = key => readOnly(`doc.${key}`);

export default EmberObject.extend({

  doc: null,
  id: readOnly('doc.id'),
  type: readOnly('doc.type'),

  parent: computed('doc.parent', 'stage.content.@each.id', function() {
    let id = this.doc.parent;
    if(!id) {
      return null;
    }
    return this.stage.content.findBy('id', id);
  }).readOnly(),

  nodes: computed('stage.content.@each.parent', function() {
    return this.stage.content.filterBy('parent', this);
  }).readOnly(),

  remove() {
    this.stage.removeNode(this);
  },

  update(props) {
    this.doc.setProperties(props);
  },

  move(target) {
    this.set('doc.parent', target && target.id);
  },

  toStringExtension() {
    let { doc: { id } } = this;
    return id;
  }

});
