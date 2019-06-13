import Component from '@ember/component';
import { style } from '../../-computed';
import { round } from '../../../../../../-private/util/math';

export default Component.extend({
  classNameBindings: [ ':ui-block-sketch-stage-guidelines-guideline', 'guideline.approx:approx' ],
  attributeBindings: [ 'style' ],

  style: style('guideline.{direction,x,y,length}', function() {
    let { guideline: { direction, x, y, length } } = this;

    let width;
    let height;

    if(direction === 'vertical') {
      width = 1;
      height = length;
    } else if(direction === 'horizontal') {
      width = length;
      height = 1;
    } else {
      return;
    }

    x = round(x, 0);
    y = round(y, 0);

    return {
      transform: `translate(${x}px, ${y}px)`,
      width: `${width}px`,
      height: `${height}px`
    };
  }).readOnly()

});
