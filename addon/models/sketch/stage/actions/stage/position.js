import Actions from '../-actions';

export default Actions.extend({

  perform({ delta }) {
    this.stage.position.update(delta, { delta: true });
  }

});
