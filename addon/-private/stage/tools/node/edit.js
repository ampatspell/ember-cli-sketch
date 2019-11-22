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

  activate({ node }) {
    if(!node || !node.isEditable) {
      this.done();
      return;
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
