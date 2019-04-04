import Component from '../-component';
import layout from './template';
import { style, className } from '../-computed';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  layout,
  classNameBindings: [ 'align', 'verticalAlign' ],

  align:         className('model.align', 'align'),
  verticalAlign: className('model.verticalAlign', 'vertical'),

  text: readOnly('model.text'),

  style: style('model.{fill,color,opacity,fontFamily,fontWeight,fontSize}', 'zoom', function() {
    let { model: { fill: background, color, opacity, fontFamily, fontWeight, fontSize, align, verticalAlign }, zoom } = this;
    return {
      background,
      opacity,
      color,
      'font-family': fontFamily,
      'font-weight': fontWeight,
      'font-size': `${fontSize * zoom}px`,
    };
  })

});
