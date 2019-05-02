import Action from '../-base';

export default Action.extend({

  perform(node) {
    let stage = node.stage;

    if(!stage) {
      return;
    }

    if(node.isContainer) {
      return;
    }

    let target = stage.nodes.containers.selectable.find(container => {
      return container !== node && container.frame.overlapsFrame(node.frame.absoluteBounds, 'absoluteBounds');
    });

    if(target) {
      if(node.parent === target) {
        return;
      }
    } else if(node.parent !== stage) {
      target = stage;
    } else {
      return;
    }

    node.moveTo(target);
    return true;
  }

});
