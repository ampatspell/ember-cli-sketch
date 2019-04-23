import Component from '../-component';
import layout from './template';
import { style, imagePromise } from '../-computed';

export default Component.extend({
  layout,

  image: null,
  promise: imagePromise('model.url', 'image'),

  style: style('model.{opacity,url}', function() {
    let { model: { opacity } } = this;
    return {
      opacity
    };
  })

});
