import EmberObject, { computed } from '@ember/object';

export default EmberObject.extend({

  node: null,

  // TODO: create guidelines instead of returning edges
  all: computed(function() {
    return this.node.edges.all;
  }).readOnly(),

  /*

    So, guidelines has two stages:
      * nearby guidelines -- those which are say 5px away and needs to be snapped to
      * equal -- when snapping happens or just postion/size is identical to another edge

  */

});
