import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import EventsMixin from './-events-mixin';
import { style, className } from './-computed';
import { array } from '../../../-private/util/computed';
import { schedule, cancel } from '@ember/runloop';
import { Promise, resolve } from 'rsvp';
import safe from '../../../-private/util/safe';

const isSketchComponent = '__isSketchComponent';

const afterRender = () => new Promise(resolve => schedule('afterRender', resolve));

export const getSketchComponent = component => {
  if(!component || component[isSketchComponent]) {
    return component;
  }
  return getSketchComponent(component.parentView);
};

export default Component.extend(EventsMixin, {
  classNameBindings: [ ':ui-block-sketch', 'fill', '_isReady:ready:loading' ],
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

  didInsertElement() {
    this._super(...arguments);
    this.focus();
    this.notifyReady(this.stage);
    this._scheduleUpdateIsReady();
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
  _isReady: false,

  _cancelScheduleIsReady() {
    cancel(this.__updateIsReady);
    cancel(this.__updateIsReadyActions);
  },

  _updateIsReady: safe(function() {
    let resolved = this._promises.length === 0;
    let stage = this.stage;
    let _isReady = resolved && stage;
    if(this._isReady === _isReady) {
      return;
    }
    this.setProperties({ _isReady });
  }),

  _scheduleUpdateIsReady() {
    this._cancelScheduleIsReady();
    this.__updateIsReady = schedule('afterRender', () => {
      if(this.isDestroying) {
        return;
      }
      cancel(this.__updateIsReadyActions);
      this.__updateIsReadyActions = schedule('actions', () => this._updateIsReady());
    });
  },

  registerRenderPromise(promise) {
    this._cancelScheduleIsReady();
    this._promises.pushObject(promise);
    this._updateIsReady();
    resolve(promise).then(() => {}, () => {}).finally(() => {
      if(this.isDestroying) {
        return;
      }
      this._promises.removeObject(promise);
      this._scheduleUpdateIsReady();
    });
  }

});
