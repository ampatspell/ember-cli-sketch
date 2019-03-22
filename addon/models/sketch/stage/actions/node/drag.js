import Actions from '../-actions';
import { readOnly } from '@ember/object/computed';

export default Actions.extend({

  dragging: readOnly('stage.dragging'),
  selection: readOnly('stage.selection'),
  areas: readOnly('stage.areas'),

  begin() {
    this.dragging.start();
  },

  end() {
    let { dragging, areas } = this;
    dragging.slice().forEach(node => areas.moveNodeIfContained(node));
    dragging.clear();
  },

  update({ x, y }) {
    let { dragging } = this;
    if(!dragging.update()) {
      return;
    }
    dragging.withNodes(node => node.frame.update({ x, y }, { delta: true }));
  }

});
