import Component from '../-component';
import layout from './template';
import { readOnly } from '@ember/object/computed';
import { style } from '../-computed';

export default Component.extend({
  layout,
  classNameBindings: [ 'task.status' ],

  style: style('model.opacity', function() {
    let { model: { opacity } } = this;
    return {
      opacity
    };
  }),

  task: readOnly('model.task')

});
