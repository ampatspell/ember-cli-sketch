import Component from '../-component';
import layout from './template';
import { style } from '../-computed';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { defer } from 'rsvp';

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

  actions: {
    imageDidLoad(e) {
      let url = e.target.src;
      let { deferred } = this;
      if(deferred.url !== url) {
        return;
      }
      deferred.resolve();
    }
  }

});
