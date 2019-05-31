import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

const source = key => readOnly(key);

const target = key => computed(`${key}.[]`, function() {
  let { node } = this;
  let array = this.get(key);
  return array.filter(edge => edge.node !== node);
}).readOnly();

export default EmberObject.extend({

  node: null,

  source: source('node.edges.all'),              // own edges
  target: target('node.stage.guidelines.edges'), // all other edges

  // TODO: create guidelines instead of returning edges
  // take source edges, match to targets, if threshold is met, create (reuse) guideline
  all: computed('target.[]', function() {
    return this.source;
  }).readOnly(),

  /*

    So, guidelines has two stages:
      * nearby guidelines -- those which are say 5px away and needs to be snapped to
      * equal -- when snapping happens or just postion/size is identical to another edge

  */

});
