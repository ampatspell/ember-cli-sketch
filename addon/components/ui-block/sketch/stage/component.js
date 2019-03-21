import Component from '@ember/component';
import layout from './template';
import WindowEventsMixin from './-window-events-mixin';

export default Component.extend(WindowEventsMixin, {
  layout,
  classNameBindings: [ ':ui-block-sketch-stage' ],

  stage: null,

  didInsertElement() {
    this._super(...arguments);
    this.parent.didInsertStageElement(this);
  },

  willDestroyElement() {
    this._super(...arguments);
    this.parent.willDestroyStageElement(this);
  },

});
