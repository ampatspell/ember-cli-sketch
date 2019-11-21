import Tool from '../-base';

export default Tool.extend({

  node: null,

  onMouseClick() {
    // this.done();
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
