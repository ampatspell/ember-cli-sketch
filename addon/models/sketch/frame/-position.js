import Mixin from '@ember/object/mixin';
import { position } from './-constraints';

const property = position({
  initial: 0,
  round: 2
});

export default Mixin.create({

  x: property('horizontal'),
  y: property('vertical')

});
