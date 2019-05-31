import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default EmberObject.extend({

  node: null,

  stage: readOnly('node.stage.guidelines'), // edges of all nodes, including this one's
  edges: readOnly('node.edges.all'),        // edges for this node

  // TODO: create guidelines instead of returning edges
  all: computed('stage.edges.[]', function() {
    return this.stage.edges;
  }).readOnly(),

  /*

    So, guidelines has two stages:
      * nearby guidelines -- those which are say 5px away and needs to be snapped to
      * equal -- when snapping happens or just postion/size is identical to another edge

  */

});
