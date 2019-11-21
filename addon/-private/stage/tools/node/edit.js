import Tool from '../-base';

export default Tool.extend({

  onMouseClick() {
    this.done();
  },

  activate() {
    console.log(this+'', 'activate');
  }

});
