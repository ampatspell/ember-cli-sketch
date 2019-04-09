import Component from '../-component';
import layout from './template';
import { style } from '../-computed';

export default Component.extend({
  layout,

  style: style('model.{opacity,url}', function() {
    let { model: { opacity, url } } = this;
    return {
      opacity,
      backgroundImage: `url("${url}")`
    };
  })

});
