import Action from '../-base';

export default Action.extend({

  calculateSize(node, aspect) {
    let { frame: { properties: { width, height } } } = node;

    let current = height / width;

    if(current > aspect) {
      return {
        width,
        height: width * aspect
      };
    } else {
      return {
        height,
        width: height / aspect
      };
    }
  },

  calculateFrame(node, size) {
    return node.frame.center(size);
  },

  perform(node, { aspect }) {
    if(!aspect) {
      return;
    }
    let size = this.calculateSize(node, aspect);
    let frame = this.calculateFrame(node, size);
    node.update(frame);
  }

});
