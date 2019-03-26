import Handler from '../-handler';

export default Handler.extend({

  update({ delta }) {
    let zoom = this.zoom + delta;
    this.stage.setProperties({ zoom });
  },

  onMouseWheel({ direction, value, keys: { meta } }) {
    if(direction !== 'x' && !meta) {
      return;
    }

    let delta = value / 10;
    this.update({ delta });

    return false;
  }

});
