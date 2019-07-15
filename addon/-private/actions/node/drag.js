import Action from '../-base';

export default Action.extend({

  perform(node) {
    console.log('node/drag', node+'');
  }

});
