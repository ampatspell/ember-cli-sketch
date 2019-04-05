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

    let shift = this.keyboard.isShift;
    node.select({ replace: !shift, toggle: shift });
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
    if(!this.mouse.absolute) {
      return;
    }
    this.updateHover();
  },

  deactivate() {
    this.hover.reset();
  }

});
