import Action from '../-action';
import { readOnly } from '@ember/object/computed';

export default Action.extend({

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
    dragging.copy().forEach(node => areas.moveNodeIfContained(node));
    dragging.clear();
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
    dragging.copy().forEach(node => this.areas.moveNodeIfContained(node));
  }

});
