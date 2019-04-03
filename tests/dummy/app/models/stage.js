import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { assign } from '@ember/polyfills';
import { node, attr } from './-node';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

const doc = key => readOnly(`doc.${key}`);

export default EmberObject.extend({

  id: 'single',

  firestore: service(),

  doc: null,
  content: null,

  node: node({ type: 'stage' }),

  x:    attr('x', { type: 'number', initial: 0 }),
  y:    attr('y', { type: 'number', initial: 0 }),
  zoom: attr('zoom', { type: 'number', initial: 1, min: 0.1, decimals: 2 }),

  // thing: attr('thing', { type: 'number', initial: 0, min: prop('thingMin'), max: prop('thingMax') }),
  // thingMin: 0,
  // thingMax: 10,

  nodes: computed('content.models.@each.{parent,position}', function() {
    return A(A(this.content.models.filterBy('parent', this)).sortBy('position'));
  }).readOnly(),

  nodeById(id) {
    return this.content.models.findBy('id', id);
  },

  async addNode(parentModel, type, props) {
    let parent = null;
    if(parentModel && parentModel !== this) {
      parent = parentModel.id;
    }

    parentModel = parentModel || this;

    let position = 0;
    let last = parentModel.nodes.lastObject;
    if(last) {
      position = last.position + 1;
    }

    await this.firestore.add(`sketches/${this.id}/nodes`, assign({ position, parent, type }, props));
  },

  removeNode(model) {
    model.nodes.slice().forEach(model => model.remove());
  },

  moveNodeToBottom(model) {
    let last = this.nodes.lastObject;
    if(last === model) {
      return;
    }
    console.log('move to bottom', model+'');
    model.doc.set('position', last.position + 1);
    model.doc.scheduleSave();
  },

  update(props) {
    this.setProperties(props);
    this.doc.scheduleSave();
  },

  handle(action) {
    action.perform();
  },

  async load() {
    let { id, firestore } = this;

    let [ doc, content ] = await Promise.all([
      firestore.doc(`sketches/${id}`, [ 'x', 'y', 'zoom' ]),
      firestore.query(`sketches/${id}/nodes`, [ 'position', 'parent', 'x', 'y', 'width', 'height', 'rotation', 'fill', 'opacity' ], { stage: this })
    ]);

    if(!doc.exists) {
      doc.setProperties({ type: 'stage', x: 0, y: 0 });
      await doc.save();
    }

    this.setProperties({
      doc,
      content
    });

    setGlobal({ stage: this });

    return this;
  }

});
