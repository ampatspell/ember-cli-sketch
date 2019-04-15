import EmberObject from '@ember/object';
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

  isLoading: true,
  isLoaded: false,
  isError: false,
  error: null,

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

  _load() {
    let { opts: { spec } } = this;
    return loadFonts(spec);
  },

  load() {
    this.onLoad();
    return this._load().then(() => {
      this.onLoaded();
      return this;
    }, err => {
      this.onError(err);
      return reject(err);
    });
  }

});
