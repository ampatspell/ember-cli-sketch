import Component from '../-component';
import { computed } from '@ember/object';
import layout from './template';
import { readOnly } from '@ember/object/computed';
import { style } from '../-computed';

export default Component.extend({
  layout,
  classNameBindings: [ 'task.status', 'content' ],

  content: computed('model.fit', function() {
    let { model: { fit } } = this;
    if(fit) {
      return 'content-fit';
    } else {
      return 'content-fill';
    }
  }).readOnly(),

  style: style('model.opacity', function() {
    let { model: { opacity } } = this;
    return {
      opacity
    };
  }),

  task: readOnly('model.task')

});
