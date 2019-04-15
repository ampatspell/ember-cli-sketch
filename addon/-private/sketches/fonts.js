import EmberObject from '@ember/object';
import { array } from '../util/computed';

export default EmberObject.extend({

  loaders: array(),

  _createLoader(opts) {
    return this.sketches.factory.fontsLoader(this, opts);
  },

  load() {
    let loader = this._createLoader({
      spec: {
        google: {
          families: ['Droid Sans', 'Droid Serif']
        }
      }
    });
    return loader.load().then(() => {
      console.log('loaded');
      return this;
    }, err => {
      console.log(err);
    });
  }

});
