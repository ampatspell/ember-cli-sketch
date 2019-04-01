import EmberObject from '@ember/object';
import { create } from '../utils/model';
import { A } from '@ember/array';
import { assign } from '@ember/polyfills';

export default EmberObject.extend({

  doc: null,
  nodes: null,

  init() {
    this._super(...arguments);
    this.prepare();
  },

  createNode(id, type, parent, props) {
    let doc = create(this, 'document', assign({ id, type, parent: parent && parent.id }, props));
    return create(this, `node/${type}`, { stage: this, doc, type });
  },

  prepare() {
    let doc = create(this, 'document', { id: 'stage', type: 'stage', x: 0, y: 0 });

    let area = this.createNode('1', 'area', null, { x: 0, y: 0, width: 300, height: 300 });
    let rect = this.createNode('2', 'rect', area, { x: 10, y: 10, width: 50, height: 50, fill: 'red', opacity: 0.5 });

    let nodes = A([
      area,
      rect
    ]);

    this.setProperties({
      doc,
      nodes
    });

    setGlobal({ stage: this });
  },

  nodeById(id) {
    return this.nodes.findBy('id', id);
  },

  addNode(id, type, parent, props) {
    let model = this.createNode(id, type, parent, props);
    this.nodes.pushObject(model);
  }

});
