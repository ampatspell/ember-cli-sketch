import Action from '../-base';

export default Action.extend({

  perform(node) {
    let { isContainer, stage, parent: container } = node;

    if(isContainer || !stage || !container) {
      return;
    }

    let findTarget = () => stage.nodes.containers.selectable.find(container => {
      return container.frame.overlapsFrame(node.frame.absoluteBounds, 'absoluteBounds');
    });

    let move = target => {
      node.moveTo(target);
      return target;
    }

    if(container.isStage) {
      let target = findTarget();
      if(target) {
        return move(target);
      }
    } else {
      let outside = container.frame.excludesFrame(node.frame.absoluteBounds, 'absoluteBounds');
      if(outside) {
        let target = findTarget() || stage;
        return move(target);
      }
    }
  }

});
