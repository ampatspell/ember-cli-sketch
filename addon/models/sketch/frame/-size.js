import Mixin from '@ember/object/mixin';
import { constrainedNumber } from '../../../util/computed';

const property = () => constrainedNumber({
  initial: 0,
  round: 2
});

export default Mixin.create({

  width: property(),
  height: property(),

});
