import Handler, { action } from './-handler';

export default Handler.extend({

  action: action('node.remove'),

  onKeyUp({ key, body }) {
    if(!body) {
      return;
    }

    if(![ 'Backspace', 'Delete' ].includes(key)) {
      return;
    }

    this.action.perform();
  }

});
