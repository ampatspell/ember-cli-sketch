import EmberObject, { computed } from '@ember/object';
import { defer, resolve } from 'rsvp';
import { readOnly } from '@ember/object/computed';
import { later, cancel } from '@ember/runloop';
import { assign } from '@ember/polyfills';
import safe from '../util/safe';

export default EmberObject.extend({

  owner: null,
  opts: null,

  promise: readOnly('deferred.promise'),

  isBusy: true,
  error: null,

  status: computed('isBusy', 'error', function() {
    let { isBusy, error } = this;
    if(isBusy) {
      return 'loading';
    }
    if(error) {
      return 'error';
    }
    return 'loaded';
  }).readOnly(),

  init() {
    this._super(...arguments);
    this.deferred = defer();
    this._scheduleInvoke();
  },

  _didInvoke: safe(function(result) {
    this.setProperties(assign({ isBusy: false }, result));
    this.deferred.resolve(this);
  }),

  _invokeDidFail: safe(function(error) {
    this.setProperties({ isBusy: false, error });
    this.deferred.reject(error);
  }),

  _invoke: safe(function() {
    let { opts: { fn }, owner } = this;
    resolve(fn.call(owner, this)).then(result => this._didInvoke(result), err => this._invokeDidFail(err));
  }),

  _scheduleInvoke() {
    let { opts: { delay } } = this;
    this.__scheduleInvoke = later(() => this._invoke(), delay);
  },

  _cancel() {
    this.cancelled = true;
    let err = new Error('Task was cancelled');
    err.code = 'cancelled';
    this.deferred.reject(err);
  },

  willDestroy() {
    cancel(this.__scheduleInvoke);
    this._cancel();
    this._super(...arguments);
  }

});
