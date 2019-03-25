import Mixin from '@ember/object/mixin';
import { constrainedNumber } from '../../../util/computed';

const property = () => constrainedNumber({
  initial: 0,
  min: -360,
  max: 360,
  decimals: 2
});

export default Mixin.create({

  // rotation: property()

});
