import EmberObject from '@ember/object';
import { array } from 'ember-cli-sketch/util/computed';
import { getOwner } from '@ember/application';
import { assign } from '@ember/polyfills';
import { position, zoom } from 'ember-cli-sketch/computed';

export default EmberObject.extend({

  all: array(),

  x:    position('_x', { initial: 100 }),
  y:    position('_y', { initial: 100 }),
  zoom: zoom('_zoom'),

  init() {
    this._super(...arguments);
    this.prepare();
  },

  byId(id) {
    return this.all.find(doc => doc.id === id);
  },

  create(parentId, id, type, props) {
    if(parentId) {
      id = `${parentId}-${id}`;
    }
    return getOwner(this).factoryFor('model:document').create(assign({ documents: this, parentId, id, type }, props));
  },

  add() {
    let document = this.create(...arguments);
    this.all.pushObject(document);
    return document;
  },

  prepare() {
    let addRects = (parent, x, y) => {
      this.add(parent, `rect-1`, 'rect', { x: x, y: y, width: 50, height: 50, rotation: 2, fill: 'red', opacity: 0.5 });
      this.add(parent, `rect-2`, 'rect', { x: x + 60, y: y, width: 50, height: 50, rotation: 2, fill: 'green', opacity: 0.5 });
    };
    let addArea = (id, x, y) => {
      let area = this.add(null, id, 'area', { x, y, width: 500, height: 200 });
      addRects(area.id, 10, 10);
      let group = this.add(area.id, 'group-1', 'group');
      addRects(group.id, 10, 70);
    }
    addArea('area-1', 0, 0);
    addArea('area-2', 0, 240);
  },

  update(props) {
    this.setProperties(props);
  },

  handle(action) {
    action.perform();
  }

});
