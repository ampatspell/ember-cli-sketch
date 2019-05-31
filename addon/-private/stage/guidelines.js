import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default EmberObject.extend({

  stage: null,
  enabled: readOnly('stage.tools.selected.guidelines'),
  nodes: readOnly('stage.selection.attached'),

  // TODO: temp
  edges: computed('nodes.@each.edges', function() {
    return this.nodes.reduce((arr, node) => {
      let { edges } = node;
      if(edges) {
        arr.push(...edges.all);
      }
      return arr;
    }, []);
  }).readOnly(),

  // TODO: temp
  lines: computed('edges.@each.{point,length}', function() {
    return this.edges;
    // return this.edges.map(edge => {
    //   let { direction, point: { x, y }, length } = edge;
    //   return { direction, x, y, length };
    // });
  }).readOnly(),

  absolute: computed('lines', function() {
    let { lines } = this;
    return lines;
  }).readOnly(),

  content: computed('enabled', 'absolute', function() {
    let { enabled, absolute } = this;
    if(!enabled) {
      return;
    }
    return absolute;
  }).readOnly()

});
