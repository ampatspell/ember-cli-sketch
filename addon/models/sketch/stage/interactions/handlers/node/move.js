import Handler, { action } from '../-handler';

export default Handler.extend({

  action: action('node.move'),

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

    this.action.perform({ delta });
  }

});
