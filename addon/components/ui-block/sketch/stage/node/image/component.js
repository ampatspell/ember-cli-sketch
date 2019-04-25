import Component from '../-component';
import layout from './template';
import { style } from '../-computed';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { defer } from 'rsvp';
import safe from '../../../../../../-private/util/safe';
import { cancel, later } from '@ember/runloop';

export default Component.extend({
  layout,

  deferred: computed('model.url', function() {
    let { model: { url } } = this;
    if(!url) {
      return;
    }
    let deferred = defer();
    deferred.url = url;
    return deferred;
  }).readOnly(),

  promise: readOnly('deferred.promise'),

  style: style('model.{opacity}', function() {
    let { model: { opacity } } = this;
    return {
      opacity
    };
  }),

  resolve: safe(function(url) {
    let { deferred } = this;
    if(deferred.url !== url) {
      return;
    }
    deferred.resolve();
  }),

  scheduleResolve(url) {
    cancel(this._scheduleResolve);
    this._scheduleResolve = later(() => this.resolve(url), 500);
  },

  willDestroyElement() {
    this._super(...arguments);
    cancel(this._scheduleResolve);
  },

  actions: {
    imageDidLoad(e) {
      this.scheduleResolve(e.target.src);
    }
  }

});
