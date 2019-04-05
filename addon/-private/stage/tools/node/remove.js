import Tool from '../-base';

export default Tool.extend({

  perform() {
    let { stage, selection } = this;

    let nodes = selection.copy();
    let perform = () => nodes.forEach(node => node.remove());

    stage.handle({
      type: 'remove-nodes',
      nodes,
      perform
    });
  },

  activate() {
    if(this.selection.any) {
      this.perform();
    }
    this.done();
  },

});
