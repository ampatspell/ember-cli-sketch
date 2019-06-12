import EmberObject, { computed } from '@ember/object';
import { filterBy } from '@ember/object/computed';
import sketches from '../util/sketches';

const guidelines = direction => computed(`node.edges.${direction}`, `node.stage.recursive.@each._${direction}Edges`, function() {
  let { node } = this;

  let sources = node.get(`edges.${direction}`);
  if(!sources) {
    return;
  }

  let nodes = this.get(`node.stage.recursive`);

  let array = [];
  let factory = sketches(this).factory;

  sources.forEach(source => {
    nodes.forEach(target => {
      if(target === node) {
        return;
      }

      let targets = target.get(`_${direction}Edges`);
      if(!targets) {
        return;
      }
      targets.forEach(edge => {
        array.push(factory.guideline(direction, source, edge));
      });
    });
  });

  return array;
}).readOnly();

const matched = key => filterBy(key, 'matches', true);

export default EmberObject.extend({

  node: null,

  allHorizontal: guidelines('horizontal'),
  allVertical:   guidelines('vertical'),

  horizontal: matched('allHorizontal'),
  vertical:   matched('allVertical')

});
