import Handler from './-handler';

export default Handler.extend({

  onKeyUp({ key, body }) {
    if(!body) {
      return;
    }
    if(![ 'Backspace', 'Delete' ].includes(key)) {
      return;
    }

    let nodes = this.stage.selection.copy();
    if(!nodes.length) {
      return;
    }
    let perform = () => nodes.forEach(node => node.remove());
    this.stage.handle({
      type: 'remove-nodes',
      nodes,
      perform
    });
  }

});
