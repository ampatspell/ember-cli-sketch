import { assert } from '@ember/debug';

const registerHash = (app, hash, prefix) => {
  if(!hash) {
    return;
  }
  for(let key in hash) {
    let factory = hash[key];
    let name = `${prefix}/${key}`;
    app.register(name, factory);
  }
  return Object.keys(hash);
}

export const register = (app, opts) => {
  let { factory, interactions, actions, tools, fonts } = opts;
  assert(`opts.factory is required`, !!factory);

  interactions = registerHash(app, interactions, 'sketch:stage/interactions/handlers');
  actions      = registerHash(app, actions,      'sketch:actions');
  tools        = registerHash(app, tools,        'sketch:stage/tools');

  factory = factory.extend({
    registrations: Object.freeze({ interactions, actions, tools, fonts })
  });

  app.register('sketch:sketches', factory);
}

export const initialize = opts => app => {
  register(app, opts);
}
