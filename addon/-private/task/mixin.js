import Mixin from '@ember/object/mixin';
import { destroyTasks } from './computed';

export default Mixin.create({

  willDestroy() {
    destroyTasks(this);
    this._super(...arguments);
  }

});
