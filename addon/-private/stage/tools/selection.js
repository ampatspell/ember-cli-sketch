import Tool from './-base';

export default Tool.extend({

  nodesForMousePosition() {
    let { stage, mouse: { absolute } } = this;
    return stage.nodesForAbsolutePosition(absolute);
  },

  updateHover() {
    let nodes = this.nodesForMousePosition();
    this.hover.replace(nodes);
  },

  updateSelection() {
    let { hover: { last: node }, selection } = this;

    if(!node) {
      selection.clear();
      return;
    }

    let shift = this.keyboard.isShift;

    if(!shift && node.isSelected) {
      return;
    }

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

  onMouseDoubleClick() {
    let node = this.selection.find(node => node.isHovered);
    if(!node) {
      return;
    }
    this.tools.activate('node/edit', { node });
  },

  onKeyDown(key) {
    if(key.isBody) {
      this.tools.activate('node/move', { key });
    }
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

  deactivate(next) {
    if(next.type === 'node/drag') {
      return;
    }
    this.hover.reset();
  }

});
