import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { round } from '../util/math';

export default EmberObject.extend({

  stage: null,
  enabled: readOnly('stage.tools.selected.guidelines'),
  selection: readOnly('stage.selection.attached'),

  // iterate selection nodes
  // nodes has lines/edges v-left, v-middle, v-right, h-top, ...
  // edges are in two groups -- vertical and horizontal. those are evaluated separately
  // lookup related nodes based on edges (v and h)
  // emit guidelines

  // TODO: final lines has to be kept the same for rerenders. This kills performance

  // list of edges of non-selected nodes
  // list of edges of selected nodes
  // of edge - edge passes threshold, it becomes a gudeline

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

  // lines: computed(function() {
  //   return [
  //     { type: 'horizontal', x: 630, y: 425, length: 500 },
  //     { type: 'vertical',   x: 630, y: 425, length: 500 }
  //   ];
  // }),

  absolute: computed('lines', function() {
    let { lines } = this;
    let pos = (line, prop) => round(line[prop], 0);
    let length = line => round(line.length, 0);
    return lines.map(line => ({
      direction: line.direction,
      x:      pos(line, 'x'),
      y:      pos(line, 'y'),
      length: length(line)
    }));
  }).readOnly(),

  content: computed('enabled', 'absolute', function() {
    let { enabled, absolute } = this;
    if(!enabled) {
      return;
    }
    return absolute;
  }).readOnly()

});
