import EmberObject, { computed } from '@ember/object';
import { assign } from '@ember/polyfills';
import { node, attr } from './-node';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default EmberObject.extend({

  id: 'single',

  firestore: service(),

  doc: null,
  content: null,

  node: node({ type: 'stage' }),

  x:    attr('_x', { type: 'number', initial: 0, decimals: 0 }),
  y:    attr('_y', { type: 'number', initial: 0, decimals: 0 }),
  zoom: attr('_zoom', { type: 'number', initial: 1, min: 0.1, decimals: 2 }),

  fill: attr('_fill', { type: 'string', initial: 'grey' }),

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

    let id = await this.firestore.add(`sketches/${this.id}/nodes`, assign({ position, parent, type, visible: false }, props));
    return this.content.models.findBy('id', id);
  },

  removeNode(model) {
    model.nodes.slice().forEach(model => model.remove());
  },

  replace(model, next) {
    let pos = model.position;
    model.doc.set('position', next.position);
    next.doc.set('position', pos);
    model.doc.scheduleSave();
    next.doc.scheduleSave();
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
      firestore.query(`sketches/${id}/nodes`, [
        'position',
        'parent',
        'x',
        'y',
        'width',
        'height',
        'rotation',
        'fill',
        'opacity',
        'fontFamily',
        'fontWeight',
        'fontSize',
        'fontStyle',
        'text',
        'color',
        'url',
        'align',
        'verticalAlign',
        'visible',
        'selectable',
        'cropMarks',
        'cropMarksInset'
      ], { stage: this })
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
  },

  toStringExtension() {
    return this.id;
  }

});
