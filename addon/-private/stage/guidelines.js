import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

const guidelines = key => computed('enabled', `stage.selection.attached.@each._${key}Guidelines`, function() {
  if(!this.enabled) {
    return;
  }

  let prop = `_${key}Guidelines`;

  let nodes = this.stage.selection.attached;
  return nodes.reduce((guidelines, node) => {
    guidelines.push(...node[prop]);
    return guidelines;
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

  horizontal: guidelines('horizontal'),
  vertical:   guidelines('vertical'),

});
