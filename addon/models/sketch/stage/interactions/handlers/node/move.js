import Handler from '../-handler';

export default Handler.extend({

  perform({ delta }) {
    let { selection, stage } = this;
    let nodes = selection.all;
    nodes.forEach(node => node.frame.update(delta, { delta: true }));
    stage.moveNodesToContainedAreas(nodes);
    nodes.forEach(node => node.isArea && node.moveToBottom());
  },

  onKeyDown({ key, body }) {
    if(!body) {
      return;
    }

    let delta = {
      x: 0,
      y: 0
    };

    let d = this.keyboard.isShift ? 15 : 1;

    if(key === 'ArrowUp') {
      delta.y = -d;
    } else if(key === 'ArrowDown') {
      delta.y = d;
    } else if(key === 'ArrowLeft') {
      delta.x = -d;
    } else if(key === 'ArrowRight') {
      delta.x = d;
    } else {
      return;
    }

    this.perform({ delta });
  }

});
