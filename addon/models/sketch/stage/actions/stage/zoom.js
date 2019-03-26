import Action from '../-action';
import { readOnly } from '@ember/object/computed';

export default Action.extend({

  zoom: readOnly('stage.zoom'),

  perform({ delta }) {
    let zoom = this.zoom + delta;
    this.stage.setProperties({ zoom });
  }

});
