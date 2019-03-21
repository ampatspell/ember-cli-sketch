export const pick = (hash, keys) => {
  let result = {};
  keys.forEach(key => {
    let value = hash[key];
    if(value !== undefined) {
      result[key] = value;
    }
  });
  return result;
}

export const omit = (hash, keys) => Object.keys(hash).reduce((ret, key) => {
  if(!keys.includes(key)) {
    ret[key] = hash[key];
  }
  return ret;
}, {});
