import Tool from '../-base';

export default Tool.extend({

  activate() {
    let { stage, selection } = this;

    if(!selection.any) {
      return;
    }

    let nodes = selection.copy();
    let perform = () => nodes.forEach(node => node.remove());

    stage.handle({
      type: 'remove-nodes',
      nodes,
      perform
    });

    this.done();
  },

});
