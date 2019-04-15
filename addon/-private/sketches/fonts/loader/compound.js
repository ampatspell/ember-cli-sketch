import EmberObject, { computed } from '@ember/object';
import { err } from '../../../util/load-fonts';
import { A } from '@ember/array';

export default EmberObject.extend({

  fonts: null,
  loaders: null,

  isLoading: computed('loaders.@each.isLoading', function() {
    return !!this.loaders.findBy('isLoading', true);
  }).readOnly(),

  isLoaded: computed('loaders.@each.isLoaded', function() {
    return !this.loaders.findBy('isLoaded', false);
  }).readOnly(),

  isError: computed('loaders.@each.isError', function() {
    return !!this.loaders.findBy('isError', true);
  }).readOnly(),

  error: computed('loaders.@each.error', function() {
    let errors = A(this.loaders.map(loader => loader.error)).compact();
    if(!errors.length) {
      return;
    }
    return err(errors);
  }).readOnly()

});
