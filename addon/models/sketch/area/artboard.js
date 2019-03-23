import Area from '../area';
import { frame } from '../frame';
import { readOnly } from '@ember/object/computed';

export default Area.extend({

  frame: frame('area'),

  _serializedFrame: readOnly('frame.serialized'),

  _moveNode(node) {
    let frame = this.frame.convertPointFromStage(node.frame.stage);
    node.remove();
    this.group.addNode(node);
    node.frame.update(frame);
    node.select({ replace: false });
  },

  moveNode(node) {
    if(node.isGroup && !node.group) {
      node.deselect();
      node.nodes.slice().forEach(node => {
        this._moveNode(node);
      });
    } else {
      node.deselect();
      this._moveNode(node);
    }
  },

  moveNodeIfContained(node) {
    if(this.frame.includesFrame(node.frame.stageBounding)) {
      this.moveNode(node);
      return true;
    }
  }

});
