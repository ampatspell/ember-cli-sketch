import EmberObject, { computed } from '@ember/object';

export default EmberObject.extend({

  node: null,

  // TODO: create guidelines instead of returning edges
  all: computed(function() {
    return this.node.edges.all;
  }).readOnly(),

});
