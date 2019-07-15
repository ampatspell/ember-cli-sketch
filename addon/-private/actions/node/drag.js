import Action from '../-base';

export default Action.extend({

  perform(node, { delta }) {
    node.update(delta, { delta: true });
    node.perform('snap-to-guidelines');
    node.perform('move-to-container');
  }

});
