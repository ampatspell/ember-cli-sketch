export const reduce = (hash, fn) => Object.keys(hash).reduce((reduced, key) => {
  let value = fn(key, hash[key]);
  if(value !== undefined) {
    reduced[key] = value;
  }
  return reduced;
}, {});

export const compact = hash => reduce(hash, (key, value) => value);
