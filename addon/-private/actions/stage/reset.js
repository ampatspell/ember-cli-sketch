import Action from '../-base';

export default Action.extend({

  perform(stage) {
    stage.update({ x: 0, y: 0, zoom: 1 });
  }

});
