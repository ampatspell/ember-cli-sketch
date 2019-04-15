import EmberObject, { computed } from '@ember/object';
import loadFonts from '../../util/load-fonts';
import { reject } from 'rsvp';

const safe = fn => function(...args) {
  if(this.isDestroying) {
    return;
  }
  return fn.call(this, ...args);
};

export default EmberObject.extend({

  fonts: null,
  opts: null,

  promise: null,
  isLoading: true,
  isLoaded: false,
  isError: false,
  error: null,

  includes(mod, family) {
    mod = this.opts[mod];
    if(mod) {
      return mod.families.includes(family);
    }
  },

  onLoad: safe(function() {
    this.setProperties({
      isLoading: true,
      isError: false,
      error: null
    });
  }),

  onLoaded: safe(function() {
    this.setProperties({
      isLoading: false,
      isLoaded: true
    });
  }),

  onError: safe(function(err) {
    this.setProperties({
      isLoading: false,
      isError: true,
      error: err
    });
  }),

  __load() {
    let { opts } = this;
    return loadFonts(opts);
  },

  _load() {
    this.onLoad();
    return this.__load().then(() => {
      this.onLoaded();
      return this;
    }, err => {
      this.onError(err);
      return reject(err);
    });
  },

  promise: computed(function() {
    return this._load();
  }).readOnly(),

});
