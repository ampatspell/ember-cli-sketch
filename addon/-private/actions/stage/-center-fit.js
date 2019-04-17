import Action from '../-base';

export default Action.extend({

  frameForOptions(stage, opts={}) {
    let { type } = opts;
    if(!type) {
      return stage.nodes.frame;
    } else if(type === 'containers') {
      return stage.nodes.containers.frame;
    }
  },

});
