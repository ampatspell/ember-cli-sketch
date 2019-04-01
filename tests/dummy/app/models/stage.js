import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { create } from '../utils/model';
import { A } from '@ember/array';
import { assign } from '@ember/polyfills';
import node from './-node';

const doc = key => readOnly(`doc.${key}`);

export default EmberObject.extend({

  node: node({ type: 'stage' }),

  doc: null,

  content: computed(function() {
    return A();
  }).readOnly(),

  x:    doc('x'),
  y:    doc('y'),
  zoom: doc('zoom'),

  nodes: computed('content.@each.parent', function() {
    return this.content.filterBy('parent', null);
  }).readOnly(),

  createNode(id, type, parent, props) {
    let doc = create(this, 'document', assign({ id, type, parent: parent && parent.id }, props));
    return create(this, `node/${type}`, { stage: this, doc });
  },

  nodeById(id) {
    return this.content.findBy('id', id);
  },

  addNode(id, type, parent, props) {
    let model = this.createNode(id, type, parent, props);
    this.content.pushObject(model);
    return model;
  }

});
