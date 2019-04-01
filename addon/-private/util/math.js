export const round = (value, decimals=2) => {
  if(!value) {
    return value;
  }
  return Number(Math.round(`${value}e${decimals}`) + `e-${decimals}`);
};

let {
  min,
  max
} = Math;

export const numberContraints = opts => value => {
  if(typeof value !== 'number' || isNaN(value)) {
    return opts.initial;
  }

  value = round(value, opts.decimals || 0);

  if(opts.min !== undefined) {
    value = max(value, opts.min);
  }

  if(opts.max !== undefined) {
    value = min(value, opts.max);
  }

  return value;
};
