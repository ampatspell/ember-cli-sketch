import Base from '../-base';

const types = Object.freeze([
  'stage/zoom',
  'stage/position',
  'node/resize',
  'node/select',
  'node/drag',
  'node/move',
  'node/remove',
  'node/hover'
]);

export default Base.extend({

  create(owner) {
    return this.model('stage/interactions', { owner });
  },

  medium(type, owner) {
    return this.model(`stage/interactions/mediums/${type}`, { owner });
  },

  handlers(owner) {
    return this.model('stage/interactions/handlers', { owner, types });
  },

  handler(type, owner) {
    return this.model(`stage/interactions/handlers/${type}`, { types, owner });
  },

});
