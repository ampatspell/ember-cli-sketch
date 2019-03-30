import Mixin from '@ember/object/mixin';
import { model } from './-model';

export default Mixin.create({

  x: model('x'),
  y: model('y')

});
