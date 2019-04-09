import Component from '../-component';
import layout from './template';
import { style } from '../-computed';

export default Component.extend({
  layout,

  style: style('model.{fill}', function() {
    let { model: { fill: background } } = this;
    return {
      background
    };
  })

});
