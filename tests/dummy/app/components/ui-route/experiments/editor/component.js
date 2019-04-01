import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { create } from '../../../../utils/model';

export default Component.extend({
  classNameBindings: [ ':ui-route-experiments-editor' ],
  layout,

  stage: computed(function() {
    return create(this, 'stage');
  }).readOnly(),

});
