import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { assign } from '@ember/polyfills';
import { node, attr } from './-node';
import { inject as service } from '@ember/service';

const doc = key => readOnly(`doc.${key}`);

export default EmberObject.extend({

  id: 'single',

  firestore: service(),

  doc: null,
  content: null,

  node: node({ type: 'stage' }),

  x:    attr('x'),
  y:    attr('y'),
  zoom: attr('zoom'),

  thing: attr('thing', { type: 'number', initial: 0 }),

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
