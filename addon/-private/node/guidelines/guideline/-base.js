import EmberObject from '@ember/object';
import { readOnly } from '@ember/object/computed';

const property = key => readOnly(`properties.${key}`);

export default EmberObject.extend({

  source: null,    // edge
  target: null,    // edge
  direction: null, // horizontal/vertical

  x:       property('x'),
  y:       property('y'),
  length:  property('length'),
  matches: property('matches')

});
