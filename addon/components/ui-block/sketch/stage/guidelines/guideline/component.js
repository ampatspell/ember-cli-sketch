import Component from '@ember/component';
import layout from './template';
import { style } from '../../-computed';

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-stage-guidelines-guideline' ],
  attributeBindings: [ 'style' ],

  style: style('guideline.{type,x,y,length}', function() {
    let { guideline: { x, y } } = this;
    return {
      top: `${y}px`,
      left: `${x}px`,
    };
  }).readOnly(),

});
