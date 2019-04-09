import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { htmlSafe } from '@ember/string';
import EventsMixin from './-events-mixin';
import { className } from './-computed';

export default Component.extend(EventsMixin, {
  classNameBindings: [ ':ui-block-sketch', 'fill' ],
  attributeBindings: [ 'style' ],
  layout,

  fill: className('stage.fill', 'fill'),

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

  cursor: readOnly('stage.node.cursor.value'),

  style: computed('cursor', function() {
    let { cursor } = this;
    if(!cursor) {
      return;
    }
    return htmlSafe(`cursor: ${cursor}`);
  }).readOnly(),

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
    stage.node.detach();
  },

  attachStage(stage) {
    stage.node.attach(this);
    if(this.element) {
      this.notifyReady(stage);
    }
  },

  focus() {
    let element = document.activeElement;
    if(element) {
      document.activeElement.blur();
    }
  },

});
