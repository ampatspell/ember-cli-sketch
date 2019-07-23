import Action from '../-base';

export default Action.extend({

  perform(node, { point }) {
    node.update(point);
    // node.perform('snap-to-guidelines');
    node.perform('move-to-container');
  },

  begin(node, edge) {
    return this.state({ node, edge });
  }

});
