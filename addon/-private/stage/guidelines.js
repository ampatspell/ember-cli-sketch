import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { round } from '../util/math';

export default EmberObject.extend({

  stage: null,
  enabled: readOnly('stage.tools.selected.guidelines'),
  selection: readOnly('stage.selection.attached'),

  // TODO: temp
  edges: computed('selection.@each.edges', function() {
    return this.selection.reduce((arr, node) => {
      arr.push(...node.edges.all);
      return arr;
    }, []);
  }).readOnly(),

  // TODO: temp
  lines: computed('edges.@each.{point,length}', function() {
    return this.edges.map(edge => {
      let { direction, point: { x, y }, length } = edge;
      return { direction, x, y, length };
    });
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
