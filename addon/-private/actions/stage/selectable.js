import Action from '../-base';

export default Action.extend({

  perform(stage, { value }) {
    if(stage.isSelectable === value) {
      return;
    }
    if(!value) {
      stage.selection.clear();
    }
    stage.update({ selectable: value });
  }

});
