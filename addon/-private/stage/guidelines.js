import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

const guidelines = key => computed(`${key}.@each._guidelines`, function() {
  let nodes = this.get(key);
  return nodes.reduce((guidelines, node) => {
    guidelines.push(...node._guidelines);
    return guidelines;
  }, []);
}).readOnly();

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

const enabled = key => computed('enabled', key, function() {
  if(this.enabled) {
    return this.get(key);
  }
}).readOnly();

export default EmberObject.extend({

  stage: null,
  enabled: readOnly('stage.tools.selected.guidelines'),

  edges: edges('stage.recursive'),

  selection: guidelines('stage.selection.attached'),
  visible: enabled('selection')

});
