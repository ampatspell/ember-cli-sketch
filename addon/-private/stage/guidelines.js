import EmberObject, { computed } from '@ember/object';
import { readOnly, mapBy } from '@ember/object/computed';

const guidelines = key => computed('enabled', `_${key}`, function() {
  if(!this.enabled) {
    return;
  }
  let guidelines = [];
  let arr = this[`_${key}`];
  arr.forEach(item => guidelines.push(...item));
  return guidelines;
}).readOnly();

const enabled = key => computed('enabled', key, function() {
  if(this.enabled) {
    return this.get(key);
  }
}).readOnly();

export default EmberObject.extend({

  stage: null,
  enabled: readOnly('stage.tools.selected.guidelines'),

  _horizontal: mapBy('stage.selection.attached', '_horizontalGuidelines'),
  _vertical:   mapBy('stage.selection.attached', '_verticalGuidelines'),

  horizontal: guidelines('horizontal'),
  vertical:   guidelines('vertical'),

});
