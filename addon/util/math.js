export const round = (value, decimals=0) => Number(Math.round(`${value}e${decimals}`) + `e-${decimals}`);

let {
  min,
  max
} = Math;

export const numberContraints = opts => value => {
  if(typeof value !== 'number' || isNaN(value)) {
    return opts.initial;
  }

  value = round(value, opts.decimals);

  if(opts.min) {
    value = max(value, opts.min);
  }

  if(opts.max) {
    value = min(value, opts.max);
  }

  return value;
};
