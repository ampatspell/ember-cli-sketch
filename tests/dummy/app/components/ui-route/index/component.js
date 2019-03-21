import Component from '@ember/component';
import layout from './template';
import environment from '../../../config/environment';

const { version } = environment;

export default Component.extend({
  classNameBindings: [ ':ui-route-index' ],
  layout,

  version

});
