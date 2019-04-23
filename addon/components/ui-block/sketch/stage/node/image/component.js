import Component from '../-component';
import layout from './template';
import { style, imagePromise } from '../-computed';

export default Component.extend({
  layout,

  image: null,
  promise: imagePromise('model.url', 'image'),

  style: style('model.opacity', 'image', function() {
    let { model: { opacity }, image } = this;
    let backgroundImage;
    if(image) {
      backgroundImage = `url(${image})`;
    }
    return {
      opacity,
      backgroundImage
    };
  })

});
