import EmberObject from '@ember/object';
import { assert } from '@ember/debug';
import { getOwner } from '@ember/application';

export default EmberObject.extend({

  node(model, opts) {
    assert(`model is required`, !!model);
    assert(`opts are required`, !!opts);

    let { identifier, type, properties } = opts;
    assert(`identifier is required`, !!identifier);
    assert(`type is required`, !!type);

    let owner = getOwner(this);
    let fullName = `sketch:node/${identifier}/${type}`;
    let factory = owner.factoryFor(fullName);
    if(!factory) {
      factory = owner.factoryFor(`sketch:factory/node/${type}`);
      assert(`node factory for type '${type}' is not registered`, !!factory);
      factory = factory.class;
      owner.register(fullName, factory({ identifier, type, properties }));
      factory = owner.factoryFor(fullName);
    }

    let { sketches } = this;
    return factory.create({ sketches, model, opts });
  },

  _create(name, props) {
    let fullName = `sketch:${name}`;
    let factory = getOwner(this).factoryFor(fullName);
    assert(`${fullName} is not registered`, !!factory);
    return factory.create(props);
  },

  edge(node) {
    return this._create(`node/edge`, { node });
  },

  attributes(node) {
    return this._create(`node/attributes`, { node });
  },

  attribute(attributes, type, opts) {
    return this._create(`node/attribute/${type}`, { attributes, opts });
  },

  frame(type, parent) {
    return this._create(`frame/${type}`, { parent });
  },

  nodes(parent) {
    return this._create('node/nodes', { parent });
  },

  typedNodes(type, nodes) {
    return this._create(`node/nodes/${type}`, { nodes });
  },

  renderer(stage) {
    return this._create('stage/renderer', { stage });
  },

  hover(stage) {
    return this._create('stage/hover', { stage });
  },

  dragging(stage) {
    return this._create('stage/dragging', { stage });
  },

  selection(stage) {
    return this._create('stage/selection', { stage });
  },

  interactions(stage) {
    return this._create('stage/interactions', { stage });
  },

  interactionMedium(type, interactions) {
    return this._create(`stage/interactions/mediums/${type}`, { interactions });
  },

  interationsKeyboardKey(opts) {
    return this._create('stage/interactions/mediums/keyboard/key', opts);
  },

  interactionHandlers(interactions) {
    return this._create('stage/interactions/handlers', {
      interactions,
      types: [
        'stage/zoom',
        'stage/position',
        'node/resize',
        'node/select',
        'node/drag',
        'node/move',
        'node/remove',
        'node/hover'
      ]
    });
  },

  interactionHandler(type, handlers) {
    return this._create(`stage/interactions/handlers/${type}`, { handlers });
  }

});
