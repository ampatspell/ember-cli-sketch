import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

const property = key => readOnly(`properties.${key}`);

export default EmberObject.extend({

  source: null,    // edge
  target: null,    // edge
  direction: null, // horizontal/vertical

  properties: computed('source.{x,y,length}', 'target.{x,y,length}', function() {
    let { source, target } = this;
    return this.calculate(source, target);
  }).readOnly(),

  x:       property('x'),
  y:       property('y'),
  length:  property('length'),
  matches: property('matches')

});
