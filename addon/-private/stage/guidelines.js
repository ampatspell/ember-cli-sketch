import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default EmberObject.extend({

  stage: null,
  enabled: readOnly('stage.tools.selected.guidelines'),

  _content: computed(function() {
    return [
      { type: 'horizontal', x: 10, y: 10, length: 500 },
      { type: 'vertical', x: 10, y: 10, length: 500 }
    ];
  }),

  content: computed('enabled', '_content', function() {
    let { enabled, _content } = this;
    if(!enabled) {
      return;
    }
    return _content;
  }).readOnly()

});
