import Actions from '../-actions';
import { readOnly } from '@ember/object/computed';

export default Actions.extend({

  dragging: readOnly('stage.dragging'),
  selection: readOnly('stage.selection'),
  areas: readOnly('stage.areas'),

  isActive: false,

  setActive(isActive) {
    this.setProperties({ isActive });
  },

  begin() {
    this.setActive(true);
    this.dragging.clear();
  },

  end() {
    let { dragging, areas } = this;
    this.setActive(false);
    dragging.clear();
    dragging.copy().forEach(node => areas.moveNodeIfContained(node));
  },

  update({ x, y }) {
    let { isActive, dragging, selection } = this;

    if(!isActive) {
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
