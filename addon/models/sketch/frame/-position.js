import Mixin from '@ember/object/mixin';
import { position } from './-constraints';

const property = position({
  initial: 0,
  decimals: 2
});

export default Mixin.create({

  x: property('horizontal'),
  y: property('vertical')

});
