import EmberObject, { computed } from '@ember/object';
import { readOnly, filterBy } from '@ember/object/computed';
import sketches from '../util/sketches';

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

  all: computed('source.[]', 'target.[]', function() {
    let { source: sources, target: targets } = this;

    if(!sources) {
      return;
    }

    let factory = sketches(this).factory;

    let create = (source, target) => {
      let { direction } = source;
      return factory.guideline(direction, source, target);
    };

    let array = [];

    sources.forEach(source => {
      targets.forEach(target => {
        if(source.direction === target.direction) {
          array.push(create(source, target));
        }
      });
    });

    return array;
  }).readOnly(),

  matched: filterBy('all', 'matches', true)

});
