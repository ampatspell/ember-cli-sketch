import Component from '../-component';
import layout from './template';
import { style } from '../-computed';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  layout,

  text: readOnly('model.text'),

  style: style('model.{fill,color,opacity,fontFamily,fontWeight,fontSize}', 'zoom', function() {
    let { model: { fill: background, color, opacity, fontFamily, fontWeight, fontSize }, zoom } = this;
    return {
      background,
      opacity,
      color,
      'font-family': fontFamily,
      'font-weight': fontWeight,
      'font-size': `${fontSize * zoom}px`
    };
  })

});
