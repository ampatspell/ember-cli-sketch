import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

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
    return lines.map(line => {
      let { type, length } = line;
      let calc = prop => (frame[prop] + line[prop]) * frame.zoom;
      return {
        type,
        x: calc('x'),
        y: calc('y'),
        length
      };
    });
  }).readOnly(),

  content: computed('enabled', 'absolute', function() {
    let { enabled, absolute } = this;
    if(!enabled) {
      return;
    }
    return absolute;
  }).readOnly()

});
