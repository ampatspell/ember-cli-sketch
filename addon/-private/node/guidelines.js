import EmberObject, { computed } from '@ember/object';
import { readOnly, filterBy } from '@ember/object/computed';
import { A } from '@ember/array';
import sketches from '../util/sketches';
import { diff } from '../util/array';

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

    let array = this.__all;
    if(!array) {
      array = A();
      this.__all = array;
    }

    let objects = [];
    sources.forEach(source => {
      targets.forEach(target => {
        if(source.direction === target.direction) {
          objects.push({ source, target });
        }
      });
    });

    let find = ({ source, target }) => array.find(guideline => {
      return guideline.source === source && guideline.target === target;
    });

    let factory = sketches(this).factory;
    let create = ({ source, target }) => {
      let { direction } = source;
      return factory.guideline(direction, source, target);
    };

    diff({ array, objects, find, create });

    return array;
  }).readOnly(),

  matched: filterBy('all', 'matches', true),

});
