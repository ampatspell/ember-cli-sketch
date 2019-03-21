import Handler from './-handler';
import { round } from '../../../../../util/math';

export default Handler.extend({

  onMouseWheel({ direction, value, keys: { meta } }) {
    if(direction === 'x' && meta) {
      let { stage, stage: { zoom } } = this;
      zoom += value / 10;
      zoom = round(zoom, 2);
      zoom = Math.max(zoom, 0);
      stage.setProperties({ zoom });
    }
  }

});
