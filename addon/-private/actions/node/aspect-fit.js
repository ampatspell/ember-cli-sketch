import Action from '../-base';

export default Action.extend({

  calculateSize(node) {
    let { aspect, frame } = node;

    if(!aspect) {
      return;
    }

    let { properties } = frame;

    let w = { width:  properties.height, height: properties.height * aspect };
    let h = { height: properties.width, width:   properties.width / aspect };

    if(w.width * w.height < h.width * h.height) {
      return w;
    } else {
      return h;
    }
  },

  calculateFrame(node, size) {
    return node.frame.center(size);
  },

  perform(node) {
    // TODO: maybe previous -> next aspect
    // now it's making nodes smaller on each run if aspect doesn't change
    let size = this.calculateSize(node);
    let frame = this.calculateFrame(node, size);
    node.update(frame);
  }

});
