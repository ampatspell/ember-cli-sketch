import Action from '../-action';

export default Action.extend({

  perform({ delta }) {
    this.stage.position.update(delta, { delta: true });
  }

});
