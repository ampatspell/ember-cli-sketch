import Tool from './-base';

export default Tool.extend({

  nodesForPosition() {
    let { stage, mouse: { absolute } } = this;
    return stage.nodesForPosition(absolute, 'absoluteBounds');
  },

  updateHover() {
    let nodes = this.nodesForPosition();
    this.hover.replace(nodes);
  },

  updateSelection({ toggle }) {
    let { hover: { last: node }, selection } = this;

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

  onMouseMove() {
    this.updateHover();
  },

  onMouseWheel() {
    this.updateHover();
  },

  onMouseDown() {
    if(!this.mouse.isLeftButtonOverStage) {
      return;
    }
    let toggle = this.keyboard.isShift;
    this.updateSelection({ toggle });
  },

  activate() {
    if(!this.point) {
      return;
    }
    this.updateHover();
  },

  deactivate() {
    this.hover.reset();
  }

});
