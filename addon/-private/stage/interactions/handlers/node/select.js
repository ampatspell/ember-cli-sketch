import Handler from '../-base';

export default Handler.extend({

  perform({ toggle }) {
    let { hover, selection } = this;

    let node = hover.last;

    if(!node) {
      selection.clear();
      return;
    }

    let includes = selection.includes(node);

    if(toggle) {
      if(includes) {
        selection.removeNode(node);
      } else {
        let remove = [
          ...selection.filter(sel => node.containsNode(sel)),
          ...selection.filter(sel => sel.containsNode(node)),
        ];
        selection.removeNodes(remove);
        selection.addNode(node);
      }
    } else {
      if(!includes) {
        selection.replace([ node ]);
      }
    }
  },

  onMouseDown() {
    let { mouse: { isLeftButtonOverStage }, keyboard: { isShift: toggle } } = this;

    if(!isLeftButtonOverStage) {
      return;
    }

    this.perform({ toggle });
  }

});
