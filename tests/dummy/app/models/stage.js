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
  content: null,

  x: doc('x'),
  y: doc('y'),
  zoom: doc('zoom'),

  nodes: computed('content.@each.parent', function() {
    return this.content.filterBy('parent', null);
  }).readOnly(),

  init() {
    this._super(...arguments);
    this.prepare();
  },

  createNode(id, type, parent, props) {
    let doc = create(this, 'document', assign({ id, type, parent: parent && parent.id }, props));
    return create(this, `node/${type}`, { stage: this, doc });
  },

  prepare() {
    let doc = create(this, 'document', { id: 'stage', type: 'stage', x: 0, y: 0, zoom: 1 });

    let area = this.createNode('1', 'area', null, { x: 0, y: 0, width: 300, height: 300 });
    let rect = this.createNode('2', 'rect', area, { x: 10, y: 10, width: 50, height: 50, fill: 'red', opacity: 0.5 });

    let content = A([
      area,
      rect
    ]);

    this.setProperties({
      doc,
      content
    });

    setGlobal({ stage: this });
  },

  nodeById(id) {
    return this.content.findBy('id', id);
  },

  addNode(id, type, parent, props) {
    let model = this.createNode(id, type, parent, props);
    this.content.pushObject(model);
  }

});
