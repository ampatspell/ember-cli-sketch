import Component from '../-component';
import layout from './template';
import { style, className, fontLoader } from '../-computed';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  layout,
  classNameBindings: [ 'align', 'verticalAlign', 'fontStyle', 'isLoading:loading:loaded' ],

  loader: fontLoader('model.fontFamily', function() {
    let { model: { fontFamily } } = this;
    if(!fontFamily) {
      return;
    }
    return {
      google: {
        families: [ fontFamily ]
      }
    };
  }),

  isLoading: readOnly('loader.isLoading'),

  align:         className('model.align', 'align'),
  verticalAlign: className('model.verticalAlign', 'vertical'),
  fontStyle:     className('model.fontStyle', 'style'),

  text: readOnly('model.text'),

  style: style('model.{fill,color,opacity,fontFamily,fontWeight,fontSize}', 'zoom', function() {
    let { model: { fill: background, color, opacity, fontFamily, fontWeight, fontSize }, zoom } = this;
    return {
      background,
      opacity,
      color,
      fontFamily,
      fontWeight,
      fontSize: `${fontSize * zoom}px`,
    };
  })

});
