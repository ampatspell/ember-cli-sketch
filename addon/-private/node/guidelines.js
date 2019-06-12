import EmberObject, { computed } from '@ember/object';
import { filterBy } from '@ember/object/computed';
import sketches from '../util/sketches';

const matched = key => filterBy(key, 'matches', true);

export default EmberObject.extend({

  node: null,

  all: computed('node.edges.all', 'node.stage.recursive.@each._edges', function() {
    let node = this.node;
    let sources = node.edges.all;
    let nodes = node.stage.recursive;

    let factory = sketches(this).factory;

    let array = [];
    sources.forEach(source => {
      let direction = source.direction;
      nodes.forEach(target => {
        if(target === node) {
          return;
        }
        let targets = target._edges;
        if(!targets) {
          return;
        }
        targets.forEach(edge => {
          if(edge.direction !== direction) {
            return;
          }
          array.push(factory.guideline(direction, source, edge));
        });
      });
    });

    return array;
  }).readOnly(),

  matched: matched('all')

});
