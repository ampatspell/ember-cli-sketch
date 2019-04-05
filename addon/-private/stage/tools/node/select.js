import Tool from '../-base';

export default Tool.extend({

  nodesForPosition() {
    let { stage, mouse: { absolute } } = this;
    return stage.nodesForPosition(absolute, 'absoluteBounds');
  },

  perform({ toggle }) {
    let nodes = this.nodesForPosition();
    let node = nodes.lastObject;

    let selection = this.selection;

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
    if(!this.mouse.isLeftButtonOverStage) {
      return;
    }
    let toggle = this.keyboard.isShift;
    this.perform({ toggle });
  },

  activate() {
  },

  deactivate() {
  },

});
