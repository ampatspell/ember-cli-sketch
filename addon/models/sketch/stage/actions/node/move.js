import Action from '../-action';
import { readOnly } from '@ember/object/computed';

export default Action.extend({

  selection: readOnly('stage.selection'),
  areas: readOnly('stage.areas'),

  perform({ delta }) {
    let { selection } = this;
    let nodes = selection.all;
    nodes.forEach(node => node.frame.update(delta, { delta: true }));
    // this.areas.moveNodesIfContained(nodes);
  }

});
