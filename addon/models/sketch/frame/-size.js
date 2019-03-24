import Mixin from '@ember/object/mixin';
import { size } from './-constraints';

const property = size({
  initial: 0,
  min: 0,
  round: 2
});

export default Mixin.create({

  width:  property('horizontal'),
  height: property('vertical')

});
