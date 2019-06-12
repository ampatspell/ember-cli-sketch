import EmberObject from '@ember/object';
import { assert } from '@ember/debug';
import { getOwner } from '@ember/application';

export default EmberObject.extend({

  opts: null,

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

  attributes(node, opts) {
    assert(`node is required`, !!node);
    assert(`opts are required`, !!opts);

    let { identifier, type } = opts;
    assert(`identifier is required`, !!identifier);
    assert(`type is required`, !!type);

    let owner = getOwner(this);
    let fullName = `sketch:node/${identifier}/${type}/attributes`;
    let factory = owner.factoryFor(fullName);
    if(!factory) {
      factory = owner.factoryFor(`sketch:factory/attributes`);
      factory = factory.class;
      owner.register(fullName, factory({ modelClass: node.model.constructor }));
      factory = owner.factoryFor(fullName);
    }

    return factory.create({ node });
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

  cursor(stage) {
    return this._create('stage/cursor', { stage });
  },

  nodeGuidelines(node) {
    return this._create('node/guidelines', { node });
  },

  stageGuidelines(stage) {
    return this._create('stage/guidelines', { stage });
  },

  guidelinesEdges(node, opts) {
    return this._create('node/guidelines/edges', { node, opts });
  },

  guidelinesEdge(edges, name) {
    return this._create(`node/guidelines/edge/${name}`, { edges });
  },

  guideline(direction, source, target) {
    return this._create(`node/guidelines/guideline/${direction}`, { direction, source, target });
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

  tools(stage) {
    let { opts: { tools: types } } = this;
    return this._create('stage/tools', {
      stage,
      types
    });
  },

  tool(type, tools) {
    return this._create(`stage/tools/${type}`, { type, tools });
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
    let { opts: { interactions: types } } = this;
    return this._create('stage/interactions/handlers', { interactions, types });
  },

  interactionHandler(type, handlers) {
    return this._create(`stage/interactions/handlers/${type}`, { handlers });
  },

  fonts(sketches) {
    let { opts: { fonts: types } } = this;
    return this._create('sketches/fonts', { sketches, types });
  },

  fontsLoader(fonts, opts) {
    return this._create('sketches/fonts/loader', { fonts, opts });
  },

  fontLoaderCompound(fonts, loaders) {
    return this._create('sketches/fonts/loader/compound', { fonts, loaders });
  },

  actions(sketches) {
    let { opts: { actions: types } } = this;
    return this._create('sketches/actions', { sketches, types });
  },

  action(type, actions) {
    return this._create(`actions/${type}`, { type, actions });
  },

  task(owner, opts) {
    return this._create('task', { owner, opts });
  }

});
