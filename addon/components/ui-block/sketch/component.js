import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { readOnly, equal, and } from '@ember/object/computed';
import { htmlSafe } from '@ember/string';
import EventsMixin from './-events-mixin';
import { className } from './-computed';
import { array } from '../../../-private/util/computed';
import { schedule, cancel, run, next } from '@ember/runloop';
import { Promise, resolve } from 'rsvp';

const isSketchComponent = '__isSketchComponent';

const afterRender = () => new Promise(resolve => schedule('afterRender', resolve));

export const getSketchComponent = component => {
  if(!component || component[isSketchComponent]) {
    return component;
  }
  return getSketchComponent(component.parentView);
};

export default Component.extend(EventsMixin, {
  classNameBindings: [ ':ui-block-sketch', 'fill', 'isReady:ready:loading' ],
  attributeBindings: [ 'style' ],
  layout,

  [isSketchComponent]: true,

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
    this._scheduleUpdatePromisesResolved();
  },

  notifyReady(stage) {
    let { ready } = this;
    if(!stage || !ready) {
      return;
    }
    ready(stage);
    this.registerRenderPromise(afterRender());
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

  //

  _promises: array(),
  _promisesResolved: false,
  isReady: and('stage', '_promisesResolved'),

  _cancelSchedulePromisesResolved() {
    cancel(this.__updatePromisesResolved);
  },

  _updatePromisesResolved() {
    let _promisesResolved = this._promises.length === 0;
    if(this._promisesResolved === _promisesResolved) {
      return;
    }
    this.setProperties({ _promisesResolved });
  },

  _scheduleUpdatePromisesResolved() {
    this._cancelSchedulePromisesResolved();
    this.__updatePromisesResolved = schedule('afterRender', () => {
      if(this.isDestroying) {
        return;
      }
      this._updatePromisesResolved();
    });
  },

  registerRenderPromise(promise) {
    this._cancelSchedulePromisesResolved();
    this._promises.pushObject(promise);
    this._updatePromisesResolved();
    resolve(promise).then(() => {}, () => {}).finally(() => {
      if(this.isDestroying) {
        return;
      }
      this._promises.removeObject(promise);
      this._scheduleUpdatePromisesResolved();
    });
  }

});
