import Tool from '../-base';

export default Tool.extend({

  node: null,
  sticky: true,

  isMouseOver() {
    let { node, mouse: { absolute } } = this;
    return node.frame.containsPosition(absolute, 'absoluteBounds');
  },

  onMouseClick() {
    if(this.isMouseOver()) {
      return;
    }
    this.done();
  },

  activate() {
    let node = this.selection.selectable.firstObject;
    if(!node) {
      this.done();
    }
    this.set('node', node);
  },

  deactivate() {
    this.reset();
  },

  reset() {
    this.set('node', null);
  }

});
