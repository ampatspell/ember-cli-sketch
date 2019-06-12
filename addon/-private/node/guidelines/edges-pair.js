import EmberObject, { computed } from '@ember/object';
import { excludesFrame } from '../../util/frame';

export default EmberObject.extend({

  source: null, // edges
  target: null, // edges

  guidelines: computed('source.bounds', 'target.bounds', function() {
    if(excludesFrame(this.source.bounds, this.target.bounds)) {
      return;
    }

    // figure out guidelines

    return [
      { direction: 'horizontal', x: 10, y: 10, length: 100 }
    ];
  }).readOnly(),

});
