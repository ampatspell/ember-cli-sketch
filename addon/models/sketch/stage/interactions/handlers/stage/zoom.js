import Handler, { action } from '../-handler';

export default Handler.extend({

  action: action('stage.zoom'),

  onMouseWheel({ direction, value, keys: { meta } }) {
    if(direction !== 'x' && !meta) {
      return;
    }

    let delta = value / 10;

    this.action.perform({ delta });
  }

});
