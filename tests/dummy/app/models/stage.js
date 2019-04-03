import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { assign } from '@ember/polyfills';
import { node, attr, prop } from './-node';
import { inject as service } from '@ember/service';

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
  thing: attr('thing', { type: 'number', initial: 0, min: 0, max: 10 }),

  thingMin: 0,
  thingMax: 10,

  nodes: computed('content.models.@each.parent', function() {
    return this.content.models.filterBy('parent', this);
  }).readOnly(),

  nodeById(id) {
    return this.content.models.findBy('id', id);
  },

  async addNode(parentModel, type, props) {
    let parent = null;
    if(parentModel && parentModel !== this) {
      parent = parentModel.id;
    }
    await this.firestore.add(`sketches/${this.id}/nodes`, assign({ parent, type }, props));
  },

  removeNode(model) {
    model.nodes.slice().forEach(model => model.remove());
  },

  update(props) {
    let { doc } = this;
    doc.setProperties(props);
    doc.scheduleSave();
  },

  handle(action) {
    action.perform();
  },

  async load() {
    let { id, firestore } = this;

    let [ doc, content ] = await Promise.all([
      firestore.doc(`sketches/${id}`, [ 'x', 'y', 'zoom' ]),
      firestore.query(`sketches/${id}/nodes`, [ 'parent', 'x', 'y', 'width', 'height', 'fill', 'opacity' ], { stage: this })
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
