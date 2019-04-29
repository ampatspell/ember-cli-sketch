import Component from '../-component';
import layout from './template';
import { style } from '../-computed';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import safe from '../../../../../../-private/util/safe';
import { decode, withImageData } from '../../../../../../-private/util/image';

export default Component.extend({
  layout,
  classNameBindings: [ 'image:loaded:loading' ],

  url: readOnly('model.url'),
  image: null,

  postprocess: null,

  promise: computed('url', 'postprocess', async function() {
    let { url, postprocess } = this;
    if(url && postprocess) {
      let result = await withImageData(url, postprocess);
      url = result.toDataURL('image/png');
    }
    return await decode(url).then(image => this.didDecodeImage(image));
  }).readOnly(),

  setImage(next) {
    let { image } = this;
    if(image !== next) {
      this.set('image', next);
    }
  },

  didDecodeImage: safe(function(image) {
    this.setImage(image);
  }),

  style: style('model.opacity', function() {
    let { model: { opacity } } = this;
    return {
      opacity
    };
  })

});
