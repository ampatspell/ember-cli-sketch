import Action from '../-base';

export default Action.extend({

  perform(node) {
    let props = node.guidelines.snapping();
    if(props) {
      node.update(props, { delta: true });
    }
  }

});
