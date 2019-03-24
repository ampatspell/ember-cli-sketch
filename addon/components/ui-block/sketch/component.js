import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import EventsMixin from './-events-mixin';

export default Component.extend(EventsMixin, {
  classNameBindings: [ ':ui-block-sketch' ],
  layout,

  size: null,

  stage: computed({
    get() {
      return this._stage;
    },
    set(_, value) {
      let current = this._stage;
      if(current !== value) {
        if(current) {
          this.detachStage(current);
        }
        if(value) {
          this.attachStage(value);
        }
        this._stage = value;
      }
      return value;
    }
  }),

  didInsertElement() {
    this._super(...arguments);
    this.notifyReady(this.stage);
  },

  notifyReady(stage) {
    let { ready } = this;
    if(!stage || !ready) {
      return;
    }
    ready(stage);
  },

  detachStage(stage) {
    stage.detach();
  },

  attachStage(stage) {
    stage.attach(this);
    if(this.element) {
      this.notifyReady(stage);
    }
  },

});
