import EmberObject, { computed } from '@ember/object';
import loadFonts from '../../util/load-fonts';
import { resolve, reject } from 'rsvp';
import safe from '../../util/safe';
import { later } from '../../util/runloop';

export default EmberObject.extend({

  fonts: null,
  opts: null,

  isLoading: true,
  isLoaded: false,
  isError: false,
  error: null,

  init() {
    this._super(...arguments);
    this._previous = this.fonts._loaders.lastObject;
  },

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

  // https://github.com/typekit/webfontloader/issues/345
  __loadPrevious() {
    let previous = this._previous;
    if(!previous) {
      return resolve();
    }
    return previous.promise.then(() => {}, () => {});
  },

  __load() {
    return this.__loadPrevious().then(() => {
      let { opts } = this;
      return loadFonts(opts);
    });
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
    return this._load().then(() => later(500));
  }).readOnly(),

});
