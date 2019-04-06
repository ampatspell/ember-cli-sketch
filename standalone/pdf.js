let runtime = require('./runtime');

let url = 'http://localhost:3000/experiments/editors/single';

runtime(async tools => {
  let buffer = await tools.pdf({ url, width: 400, height: 400 });
  await tools.save({ filename: 'pdf.pdf', buffer });
});
