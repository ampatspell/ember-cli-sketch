import Component from '../-component';
import layout from './template';
import { style, imagePromise } from '../-computed';

export default Component.extend({
  layout,

  promise: imagePromise('model.url'),

  style: style('model.{opacity,url}', function() {
    let { model: { opacity, url } } = this;
    let backgroundImage;
    if(url) {
      backgroundImage = `url(${url})`;
    }
    return {
      opacity,
      backgroundImage
    };
  })

});
