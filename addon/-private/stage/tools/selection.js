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

  updateSelection() {
    let { hover: { last: node }, selection } = this;

    if(!node) {
      selection.clear();
      return;
    }

    let toggle = this.keyboard.isShift;
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

  selectedNodeWithActiveEdge() {
    return this.selection.find(node => node.edge.has);
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

    let node = this.selectedNodeWithActiveEdge();
    if(node) {
      this.tools.activate('node/resize', { node });
    } else {
      this.updateSelection();

      if(this.selection.any) {
        this.tools.activate('node/drag');
      }
    }
  },

  onKeyDown(key) {
    this.tools.activate('node/move', { key });
  },

  onKeyUp(key) {
    if(key.isBody && key.isBackspaceOrDelete) {
      this.tools.activate('node/remove', { key });
    }
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
