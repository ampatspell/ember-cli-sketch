import Base from './-base';

export default Base.extend({

  stage(type, props) {
    return this._model(`model/stage/${type}`, props);
  },

  node(stage, type, object) {
    return this._model(`model/node/${type}`, { stage, object });
  }

});
