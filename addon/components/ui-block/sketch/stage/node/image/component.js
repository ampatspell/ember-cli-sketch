import Component from '../-component';
import layout from './template';
import { style } from '../-computed';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { resolve } from 'rsvp';
import safe from '../../../../../../-private/util/safe';

const decode = url => {
  if(!url) {
    return resolve();
  }
  let image = new Image();
  image.src = url;
  return resolve().then(() => image.decode()).then(() => image);
}

export default Component.extend({
  layout,
  classNameBindings: [ 'image:loaded:loading' ],

  url: readOnly('model.url'),
  image: null,

  promise: computed('url', function() {
    let { url } = this;
    this.setImage(null);
    return decode(url).then(image => this.didDecodeImage(image), () => {});
  }).readOnly(),

  setImage(image) {
    let { element } = this;
    if(!element) {
      return;
    }
    let current = this.image;
    if(image === current) {
      return;
    }
    if(current) {
      current.remove();
    }
    this.set('image', image);
    if(image) {
      element.appendChild(image);
    }
  },

  didDecodeImage: safe(function(image) {
    if(image.src !== this.url) {
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
