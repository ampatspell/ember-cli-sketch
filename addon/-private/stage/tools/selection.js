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

  moveSelectedNodesForKey({ key }) {
    let { selection, stage, keyboard } = this;

    let delta = {
      x: 0,
      y: 0
    };

    let d = keyboard.isShift ? 15 : 1;

    if(key.isArrowUp) {
      delta.y = -d;
    } else if(key.isArrowDown) {
      delta.y = d;
    } else if(key.isArrowLeft) {
      delta.x = -d;
    } else if(key.isArrowRight) {
      delta.x = d;
    } else {
      return;
    }

    let nodes = selection.all;
    nodes.forEach(node => node.update(delta, { delta: true }));
    stage.moveNodesToOverlappingContainers(nodes);
    nodes.forEach(node => node.isContainer && node.moveToBottom());
  },

  removeSelectedNodes() {
    let { stage, selection } = this;

    if(!selection.any) {
      return;
    }

    let nodes = selection.copy();
    let perform = () => nodes.forEach(node => node.remove());

    stage.handle({
      type: 'remove-nodes',
      nodes,
      perform
    });
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
    this.moveSelectedNodesForKey({ key });
  },

  onKeyUp(key) {
    if(key.isBackspaceOrDelete) {
      this.removeSelectedNodes();
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
