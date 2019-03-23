import Action from '../-action';
import { readOnly } from '@ember/object/computed';

export default Action.extend({

  selection: readOnly('stage.selection'),

  perform() {
    let nodes = this.selection.copy();

    if(!nodes.length) {
      return;
    }

    let perform = () => nodes.forEach(node => node.remove());
    this.stage.handle({
      type: 'remove-nodes',
      nodes,
      perform
    });
  }

});
