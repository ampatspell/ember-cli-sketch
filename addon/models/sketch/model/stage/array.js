import Base from './-base';
import { array } from '../../../../util/computed';
import ArrayObserver from '../../../../util/array-observer';
import { assert } from '@ember/debug';

export default Base.extend({

  _observer: null,
  models: array(),

  prepare() {
    this._super(...arguments);
    assert(`array is required`, !!this.array);
    this._observer = new ArrayObserver(this.array, {
      added:   (objects, start, len) => this.onSourceObjectsAdded(objects, start, len),
      removed: (objects, start, len) => this.onSourceObjectsRemoved(objects, start, len)
    });
  },

  //

  onSourceObjectsAdded(objects, start) {
    let models = this.createModels(objects);
    this.models.replace(start, 0, models);
    this.onModelsAdded(models);
  },

  onSourceObjectsRemoved(objects, start, len) {
    let models = this.models.slice(start, start + len);
    this.models.replace(start, len);
    this.onModelsRemoved(models);
  },

  willDestroy() {
    this._observer.destroy();
    this._super(...arguments);
  }

});
