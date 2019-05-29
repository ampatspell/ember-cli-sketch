import Component from '@ember/component';
import { readOnly } from '@ember/object/computed';
import layout from './template';

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-stage-guidelines' ],

  guidelines: readOnly('stage.node.guidelines'),
  content: readOnly('guidelines.content'),

});
