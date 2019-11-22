import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import EventsMixin from './-events-mixin';
import ReadyMixin from './-ready';
import { style, className } from './-computed';

const isSketchComponent = '__isSketchComponent';

export const getSketchComponent = component => {
  if(!component || component[isSketchComponent]) {
    return component;
  }
  return getSketchComponent(component.parentView);
};

export default Component.extend(EventsMixin, ReadyMixin, {
  classNameBindings: [ ':ui-block-sketch-stage', 'fill' ],
  attributeBindings: [ 'style' ],
  layout,

  [isSketchComponent]: true,

  size: null,

  fill: className('stage.fill', 'fill'),
  elementSize: null,

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

  style: style('cursor', 'size', function() {
    let { cursor, size } = this;
    let props = {
      cursor
    };
    if(size) {
      let px = key => `${Math.ceil(size[key])}px`;
      props.width = px('width');
      props.height = px('height');
    }
    return props;
  }),

  disableSpellcheck() {
    let { body } = document;
    if(!body) {
      return;
    }
    if(typeof body.setAttribute !== 'function') {
      return;
    }
    document.body.setAttribute('spellcheck', false);
  },

  didInsertElement() {
    this._super(...arguments);
    this.disableSpellcheck();
    this.focus();
    this.notifyReady(this.stage);
  },

  willDestroyElement() {
    this._super(...arguments);
    this.detachStage(this._stage);
  },

  isStageAttachedToSelf(stage) {
    return stage && stage.node.renderer.isAttachedTo(this);
  },

  notifyReady(stage) {
    if(!this.isStageAttachedToSelf(stage)) {
      return;
    }
    let { ready } = this;
    if(ready) {
      ready(stage);
    }
    this.scheduleReady();
  },

  detachStage(stage) {
    stage && stage.node.detach();
  },

  attachStage(stage) {
    try {
      stage.node.attach(this);
    } catch(err) {
      console.error(err); // eslint-disable-line no-console
      return;
    }

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

  recalculateSize() {
    this.elementSizeDidChange();
  }

});
