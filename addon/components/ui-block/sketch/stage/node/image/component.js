import Component from '../-component';
import layout from './template';
import { style } from '../-computed';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { resolve } from 'rsvp';
import safe from '../../../../../../-private/util/safe';

const decode = url => {
  if(!url) {
    return resolve(null);
  }
  let image = new Image();
  image.src = url;
  return resolve(image.decode()).then(() => image);
}

export default Component.extend({
  layout,
  classNameBindings: [ 'image:loaded:loading' ],

  url: readOnly('model.url'),
  image: null,

  promise: computed('url', function() {
    let { url } = this;
    return decode(url).then(image => this.didDecodeImage(image), () => this.didDecodeImage(null));
  }).readOnly(),

  setImage(next) {
    let { image } = this;
    if(image !== next) {
      this.set('image', next);
    }
  },

  didDecodeImage: safe(function(image) {
    if(image && image.src !== this.url) {
      return;
    }
    this.setImage(image);
  }),

  style: style('model.opacity', function() {
    let { model: { opacity } } = this;
    return {
      opacity
    };
  })

});
