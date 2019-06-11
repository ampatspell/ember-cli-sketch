import { computed } from '@ember/object';
import Guideline from './-base';

export default Guideline.extend({

  properties: computed('source.{x,y,length}', 'target.{y,length}', function() {
    let { source, target } = this;
    if(source.x !== target.x) {
      return;
    }

    let x = source.x;
    let y;
    let length;

    if(source.y < target.y) {
      y = source.y;
      length = target.y - source.y + target.length;
    } else if (source.y + source.length < target.y + target.length) {
      y = target.y;
      length = target.length;
    } else {
      y = target.y;
      length = source.y - target.y + source.length;
    }

    return {
      x,
      y,
      length,
      matches: true
    };
  }).readOnly(),

});
