import Route from '@ember/routing/route';
import { create } from '../../../utils/model';

export default Route.extend({

  model({ editor_id }) {
    return create(this, 'stage', { id: editor_id }).load();
  }

});
