import Component from '../-component';
import layout from './template';
import { style } from '../-computed';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import safe from '../../../../../../-private/util/safe';
import decodeImage from '../../../../../../-private/util/decode-image';

export default Component.extend({
  layout,
  classNameBindings: [ 'image:loaded:loading' ],

  url: readOnly('model.url'),
  image: null,

  promise: computed('url', function() {
    let { url } = this;
    return this.decode(url);
  }).readOnly(),

  didDecodeImage: safe(function(next) {
    let { image } = this;
    if(image !== next) {
      this.set('image', next);
    }
  }),

  decode: safe(function(url) {
    return decodeImage(url).then(image => this.didDecodeImage(image));
  }),

  style: style('model.opacity', function() {
    let { model: { opacity } } = this;
    return {
      opacity
    };
  })

});
