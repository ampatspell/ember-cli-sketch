import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNameBindings: [ ':marker', 'vertical', 'horizontal', 'disabled:disabled', 'over:over' ],

  over: computed('edge.serialized', 'vertical', 'horizontal', function() {
    let edge = this.edge.serialized;
    if(!edge) {
      return;
    }
    return edge.horizontal === this.horizontal && edge.vertical === this.vertical;
  }).readOnly()

});
