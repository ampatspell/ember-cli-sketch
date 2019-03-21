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
    this.ready && this.ready();
  },

  didInsertStageElement(stageComponent) {
    this.setProperties({ stageComponent });
  },

  willDestroyStageElement() {
    this.setProperties({ stageComponent: null });
  },

  detachStage(stage) {
    stage.detach();
  },

  attachStage(stage) {
    stage.attach(this);
  },

  recalculateSize() {
    let { stageComponent } = this;
    if(!stageComponent) {
      return;
    }
    stageComponent.elementSizeDidChange();
  }

});
