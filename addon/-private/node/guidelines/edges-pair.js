import EmberObject, { computed } from '@ember/object';

export default EmberObject.extend({

  source: null, // edges
  target: null, // edges

  guidelines: computed(function() {
    return [
      { direction: 'horizontal', x: 10, y: 10, length: 100 }
    ];
  }).readOnly(),

});
