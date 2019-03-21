import Handler from './-handler';

export default Handler.extend({

  onKeyUp({ key }) {
    if(![ 'Backspace', 'Delete' ].includes(key)) {
      return;
    }
    let nodes = this.stage.selection.copy();
    nodes.forEach(node => node.remove());
  }

});
