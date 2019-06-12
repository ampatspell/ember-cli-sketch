import EmberObject, { computed } from '@ember/object';
// import { filterBy } from '@ember/object/computed';
import sketches from '../util/sketches';

// const matched = key => filterBy(key, 'matches', true);

export default EmberObject.extend({

  node: null,

  pairs: computed('node.edges', 'node.stage.recursive.@each.edges', function() {
    let source = this.node;
    let targets = source.stage.recursive;
    let array = [];
    let factory = sketches(this).factory;
    targets.forEach(target => {
      if(target === source) {
        return;
      }
      array.push(factory.guidelinesEdgesPair(source.edges, target.edges));
    });
    return array;
  }).readOnly(),

  // matched: computed(function() {
  //   return [];
  // }).readOnly(),

  // init() {
  //   this._super(...arguments);
  //   setGlobal({ guidelines: this });
  // }

});
