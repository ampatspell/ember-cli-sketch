import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch' ],

  stageComponent: null,
  size: readOnly('stageComponent.size'),

  stage: computed({
    get() {
      return this._stage;
    },
    set(key, value) {
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

  didInsertStageElement(stageComponent) {
    this.setProperties({ stageComponent });
  },

  willDestroyStageElement() {
    this.setProperties({ stageComponent: null });
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

  recalculateSize() {
    let { stageComponent } = this;
    if(!stageComponent) {
      return;
    }
    stageComponent.elementSizeDidChange();
  }

});
