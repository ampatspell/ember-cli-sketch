import Base from './-base';
import ArrayObserver from '../../../../util/array-observer';
import { assert } from '@ember/debug';

export default Base.extend({

  _observer: null,

  prepare() {
    this._super(...arguments);
    assert(`array is required`, !!this.array);
    this._observer = new ArrayObserver(this.array, {
      added:   models => this.onModelsAdded(models),
      removed: models => this.onModelsRemoved(models),
      updated: model  => this.onModelUpdated(model)
    });
  },

  removeModel(model) {
    this.array.removeObject(model);
  },

  willDestroy() {
    this._observer.destroy();
    this._super(...arguments);
  }

});
