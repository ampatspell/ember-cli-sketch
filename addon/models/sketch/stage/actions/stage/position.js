import Action from '../-action';

export default Action.extend({

  perform({ delta }) {
    this.stage.frame.update(delta, { delta: true });
  }

});
