import Action from '../-action';
import { readOnly } from '@ember/object/computed';

export default Action.extend({

  selection: readOnly('stage.selection'),

  perform({ delta }) {
    let { selection } = this;
    let nodes = selection.all;
    nodes.forEach(node => node.frame.update(delta, { delta: true }));
    this.stage.moveNodesToContainedAreas(nodes);
    nodes.forEach(node => node.isArea && node.moveToBottom());
  }

});
