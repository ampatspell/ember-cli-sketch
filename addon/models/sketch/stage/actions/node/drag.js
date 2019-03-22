import Actions from '../-actions';
import { readOnly } from '@ember/object/computed';

export default Actions.extend({

  dragging: readOnly('stage.dragging'),
  selection: readOnly('stage.selection'),
  areas: readOnly('stage.areas'),

  isDragging: false,

  setDragging(isDragging) {
    this.setProperties({ isDragging });
  }

  begin() {
    this.setDragging(true);
    this.dragging.clear();
  },

  end() {
    let { dragging, areas } = this;
    this.setDragging(false);
    dragging.clear();
    dragging.copy().forEach(node => areas.moveNodeIfContained(node));
  },

  update({ x, y }) {
    let { isDragging, dragging, selection } = this;

    if(!isDragging) {
      return;
    }

    if(!dragging.any) {
      if(!selection.any) {
        return;
      }
      dragging.replace(selection.all);
    }

    dragging.forEach(node => node.frame.update({ x, y }, { delta: true }));
  }

});
