import Tool from '../-base';

export default Tool.extend({

  perform() {
    let { stage, selection } = this;

    selection = selection.copy();

    let perform = filter => {
      let array = selection;
      if(filter) {
        array = array.filter(node => filter(node.model));
      }
      array.forEach(node => node.remove());
    };

    let nodes = selection.map(node => node.model);

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
