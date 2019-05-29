import Component from '@ember/component';
import layout from './template';
import { style } from '../../-computed';

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-stage-guidelines-guideline' ],
  attributeBindings: [ 'style' ],

  style: style('guideline.{type,x,y,length}', function() {
    let { guideline: { type, x, y, length } } = this;

    let width;
    let height;

    if(type === 'vertical') {
      width = 1;
      height = length;
    } else if(type === 'horizontal') {
      width = length;
      height = 1;
    } else {
      return;
    }

    return {
      top: `${y}px`,
      left: `${x}px`,
      width: `${width}px`,
      height: `${height}px`
    };
  }).readOnly(),

});
