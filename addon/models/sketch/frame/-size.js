import Mixin from '@ember/object/mixin';
import { model } from './-model';

export default Mixin.create({

  width:  model('width'),
  height: model('height')

});
