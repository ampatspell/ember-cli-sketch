import Handler from '../-handler';

export default Handler.extend({

  perform() {
    let { stage, selection } = this;

    let nodes = selection.copy();
    if(!nodes.length) {
      return;
    }

    let perform = () => nodes.forEach(node => node.remove());

    stage.handle({
      type: 'remove-nodes',
      nodes,
      perform
    });
  },

  onKeyUp({ key, body }) {
    if(!body) {
      return;
    }

    if(![ 'Backspace', 'Delete' ].includes(key)) {
      return;
    }

    this.perform();
  }

});
