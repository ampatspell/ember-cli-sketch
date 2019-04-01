import EmberObject from '@ember/object';
import { model } from './util/computed';

export default EmberObject.extend({

  factory: model('factory', sketches => ({ sketches })),

});
