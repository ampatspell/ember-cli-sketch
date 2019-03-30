import EmberObject from '@ember/object';
import { array } from 'ember-cli-sketch/util/computed';
import { getOwner } from '@ember/application';
import { assign } from '@ember/polyfills';

export default EmberObject.extend({

  all: array(),

  init() {
    this._super(...arguments);
    this.prepare();
  },

  byId(id) {
    return this.all.find(doc => doc.id === id);
  },

  add(parent, id, type, props) {
    let parentId = parent && parent.id;
    if(parentId) {
      id = `${parentId}-${id}`;
    }
    let document = getOwner(this).factoryFor('model:document').create(assign({ parentId, id, type }, props));
    this.all.pushObject(document);
    return document;
  },

  prepare() {
    let addArea = (id, x, y) => {
      let area = this.add(null, id, 'area', { x, y, width: 500, height: 200 });
      this.add(area, `rect-1`, 'rect', { x: 10, y: 10, width: 50, height: 50, rotation: 2, fill: 'red', opacity: 0.5 });
      this.add(area, `rect-2`, 'rect', { x: 70, y: 10, width: 50, height: 50, rotation: 2, fill: 'green', opacity: 0.5 });
    }
    addArea('area-1', 0, 0);
    addArea('area-2', 0, 240);
  },

});
