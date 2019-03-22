import Handler from './-handler';

export default Handler.extend({

  onMouseDown() {
    let { mouse: { isLeftButtonOverStage }, keyboard: { isShift: toggle }, stage: { selection, hover: { last: node } } } = this;

    if(!isLeftButtonOverStage) {
      return;
    }

    let includes = selection.includes(node);

    if(node) {
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
    } else {
      selection.replace([]);
    }
  }

});
