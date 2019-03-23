import Actions from '../-actions';
import { readOnly } from '@ember/object/computed';

export default Actions.extend({

  zoom: readOnly('stage.zoom'),

  perform({ delta }) {
    let { zoom } = this;
    zoom += delta;
    stage.setProperties({ zoom });
  }

});
