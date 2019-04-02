import Route from '@ember/routing/route';
import { create } from '../../utils/model';

export default Route.extend({

  model() {
    return create(this, 'stage').load();
  }

});
