import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { assign } from '@ember/polyfills';
import { node, attr } from '../-node';

export {
  node,
  attr
};

export const position = (target, opts) => attr(target, assign({ type: 'number' }, opts));
export const size = (target, opts) => attr(target, assign({ type: 'number', min: 0 }, opts));
export const rotation = (target, opts) => attr(target, assign({ type: 'number', min: -360, max: 360 }, opts));

export default EmberObject.extend({

  doc: null,
  id: readOnly('doc.id'),
  type: readOnly('doc.type'),

  parent: computed('doc.parent', 'stage.content.models.@each.id', function() {
    let id = this.doc.parent;
    let stage = this.stage;
    if(id === null) {
      return stage;
    }
    return stage.content.models.findBy('id', id);
  }).readOnly(),

  nodes: computed('stage.content.models.@each.parent', function() {
    return this.stage.content.models.filterBy('parent', this);
  }).readOnly(),

  remove() {
    this.set('doc.parent', undefined);
    this.stage.removeNode(this);
    this.doc.delete();
  },

  update(props) {
    this.setProperties(props);
    this.doc.scheduleSave();
  },

  move(target) {
    this.set('doc.parent', target && target.id);
    this.doc.scheduleSave();
  },

  toStringExtension() {
    let { doc: { id } } = this;
    return id;
  }

});
