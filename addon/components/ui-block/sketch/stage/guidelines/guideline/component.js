import Component from '@ember/component';
import { readOnly } from '@ember/object/computed';
import { style } from '../../-computed';
import { round } from '../../../../../../-private/util/math';

export default Component.extend({
  classNameBindings: [ ':ui-block-sketch-stage-guidelines-guideline', 'guideline.approx:approx' ],
  attributeBindings: [ 'style' ],

  zoom: readOnly('stage.node.zoom'),

  style: style('guideline.{direction,x,y,length}', 'zoom', function() {
    let { guideline: { direction, x, y, length }, zoom: _zoom } = this;

    let width;
    let height;

    let zoom = value => round(value * _zoom, 0);

    x = zoom(x);
    y = zoom(y);

    length = zoom(length);

    if(direction === 'vertical') {
      width = 1;
      height = length;
    } else if(direction === 'horizontal') {
      width = length;
      height = 1;
    } else {
      return;
    }

    return {
      transform: `translate(${x}px, ${y}px)`,
      width: `${width}px`,
      height: `${height}px`
    };
  }).readOnly()

});
