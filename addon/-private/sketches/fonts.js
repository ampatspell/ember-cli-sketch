import EmberObject from '@ember/object';
import { array } from '../util/computed';
import { A } from '@ember/array';

export default EmberObject.extend({

  _loaders: array(),

  _createLoader(opts) {
    let loader = this.sketches.factory.fontsLoader(this, opts);
    this._loaders.pushObject(loader);
    return loader;
  },

  _createCompoundLoader(loaders) {
    return this.sketches.factory.fontLoaderCompound(this, loaders);
  },

  _loaderFor(mod, family) {
    return this._loaders.find(loader => loader.includes(mod, family));
  },

  loaders(opts) {
    let loaders = A();
    for(let mod in opts) {
      let families = opts[mod].families;
      let missing = [];
      families.forEach(family => {
        let loader = this._loaderFor(mod, family);
        if(loader) {
          loaders.push(loader);
        } else {
          missing.push(family);
        }
      });
      if(missing.length) {
        loaders.push(this._createLoader({ [mod]: { families: missing } }));
      }
    }
    return loaders;
  },

  loader(opts) {
    let loaders = this.loaders(opts);
    if(loaders.length === 1) {
      return loaders[0];
    }
    return this._createCompoundLoader(loaders);
  }

});
