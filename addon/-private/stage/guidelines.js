import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

const edges = key => computed(`${key}.@each.edges`, function() {
  let nodes = this.get(key);
  return nodes.reduce((arr, node) => {
    let { edges } = node;
    if(edges) {
      arr.push(...edges.all);
    }
    return arr;
  }, []);
}).readOnly();

export default EmberObject.extend({

  stage: null,
  enabled: readOnly('stage.tools.selected.guidelines'),

  recursive: readOnly('stage.recursive'),
  selection: readOnly('stage.selection.attached'),

  edges:    edges('recursive'),
  selected: edges('selection'),

  // TODO: tmp
  all: computed('edges', function() {
    let { edges } = this;
    return edges;
  }).readOnly(),

  visible: computed('enabled', 'all', function() {
    let { enabled, all } = this;
    if(enabled) {
      return all;
    }
  }).readOnly()

});
