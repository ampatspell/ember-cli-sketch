import Handler from './-handler';

export default Handler.extend({

  onMouseDown() {
    let { mouse: { isLeftButtonOverStage }, keyboard: { isShift: toggle }, stage: { selection, hover: { lastNode: node } } } = this;

    if(!isLeftButtonOverStage) {
      return;
    }

    let includes = selection.includes(node);

    if(node) {
      if(toggle) {
        if(includes) {
          selection.removeNode(node);
        } else {
          selection.addNode(node);
        }
        if(node.isGroup) {
          let remove = selection.filter(sel => node.containsNode(sel));
          selection.removeNodes(remove);
        } else {
          let remove = selection.filter(sel => node.hasParentNode(sel));
          selection.removeNodes(remove);
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
