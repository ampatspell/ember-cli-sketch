import Action from '../-base';

export default Action.extend({

  calculate(node) {
    let { width, height } = node.frame.properties;
    if(!width || !height) {
      return;
    }
    return width / height;
  },

  perform(node) {
    let aspect = this.calculate(node);
    if(aspect) {
      node.update({ aspect });
    }
  }

});
