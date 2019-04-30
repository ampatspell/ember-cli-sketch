import Component from '../-component';
import layout from './template';
import { style } from '../-computed';
import { readOnly } from '@ember/object/computed';
import decodeImage from '../../../../../../-private/util/decode-image';
import TaskMixin, { task } from '../../../../../../-private/task';

export default Component.extend(TaskMixin, {
  layout,
  classNameBindings: [ 'task.status' ],

  style: style('model.opacity', function() {
    let { model: { opacity } } = this;
    return {
      opacity
    };
  }),

  url: readOnly('model.url'),

  task: task('url', async function() {
    let { url } = this;
    let image = await this.decode(url);
    return {
      image
    };
  }),

  decode(arg) {
    return decodeImage(arg);
  }

});
