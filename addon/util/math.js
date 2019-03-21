export const round = (value, decimals=0) => Number(Math.round(`${value}e${decimals}`) + `e-${decimals}`);
