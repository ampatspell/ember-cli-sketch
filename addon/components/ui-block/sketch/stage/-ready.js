import Mixin from '@ember/object/mixin';
import { array } from '../../../../-private/util/computed';
import safe from '../../../../-private/util/safe';
import { schedule, later, cancel } from '@ember/runloop';
import { resolve } from 'rsvp';
import { next } from '../../../../-private/util/runloop';
import { readOnly } from '@ember/object/computed';

export default Mixin.create({

  _promises: array(),
  _isReady: false,

  isReady: readOnly('_isReady'),

  willDestroyElement() {
    this._super(...arguments);
    this._cancelScheduleIsReady();
  },

  scheduleReady: safe(function() {
    this.registerRenderPromise(next());
  }),

  _cancelScheduleIsReady() {
    cancel(this.__updateIsReady);
    cancel(this.__updateIsReadyActions);
  },

  _updateIsReady: safe(function() {
    let resolved = this._promises.length === 0;
    let stage = this.stage;
    let _isReady = resolved && !!stage;
    if(this._isReady === _isReady) {
      return;
    }
    this.setProperties({ _isReady });
  }),

  _scheduleUpdateIsReady() {
    this._cancelScheduleIsReady();
    this.__updateIsReady = schedule('afterRender', () => {
      cancel(this.__updateIsReadyActions);
      this.__updateIsReadyActions = later(() => this._updateIsReady(), 10);
    });
  },

  registerRenderPromise: safe(function(promise) {
    promise = resolve(promise).then(() => next());

    this._cancelScheduleIsReady();

    this._promises.pushObject(promise);
    this._updateIsReady();

    resolve(promise).then(() => {}, err => {
      console.error('Render promise rejection', err); // eslint-disable-line no-console
    }).finally(() => {
      if(this.isDestroying) {
        return;
      }
      this._promises.removeObject(promise);
      this._scheduleUpdateIsReady();
    });
  })

});
