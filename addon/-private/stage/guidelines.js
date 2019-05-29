import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { round } from '../util/math';

export default EmberObject.extend({

  stage: null,
  enabled: readOnly('stage.tools.selected.guidelines'),

  lines: computed(function() {
    return [
      { type: 'horizontal', x: 630, y: 425, length: 500 },
      { type: 'vertical', x: 630, y: 425, length: 500 }
    ];
  }),

  absolute: computed('lines', 'stage.frame.{zoom,x,y}', function() {
    let { lines, stage: { frame } } = this;
    let { zoom } = frame;
    let pos = (line, prop) => round(frame[prop] * zoom, 0) + round(line[prop] * zoom, 0);
    let length = line => round(line.length * zoom, 0);
    return lines.map(line => ({
      type:   line.type,
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
