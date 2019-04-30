import { computed } from '@ember/object';
import sketches from '../util/sketches';

const __ember_cli_sketch_task = '__ember_cli_sketch_task';
const __task_ = '__task_';

export const build = opts => {
  let { deps, fn, identityFn } = opts;
  return computed(...deps, function(key) {
    if(this.isDestroying) {
      return;
    }
    let identity = identityFn && identityFn.call(this, this);
    let _key = `${__task_}${key}`;
    let task = this[_key];
    if(task) {
      if(identity !== undefined && task.opts.identity === identity) {
        return task;
      }
      task.destroy();
    }
    task = sketches(this).factory.task(this, { fn, identity, delay: 50 });
    this[_key] = task;
    return task;
  }).meta({ [__ember_cli_sketch_task]: true });
}

export const task = (...deps) => {
  let fn = deps.pop();
  let prop = build({ deps, fn });
  prop.cached = identityFn => build({ deps, fn, identityFn });
  return prop;
}

export const destroyTasks = owner => owner.constructor.eachComputedProperty((key, meta) => {
  if(meta[__ember_cli_sketch_task] !== true) {
    return;
  }
  let _key = `${__task_}${key}`;
  let task = owner[_key];
  if(!task) {
    return;
  }
  task.destroy();
});
