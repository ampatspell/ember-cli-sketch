let runtime = require('./runtime');

runtime(async tools => {
  let id = 'single';
  let width = 210;
  let height = 297;

  let url = `http://localhost:3000/experiments/editors/${id}/pdf/${width}/${height}`;

  let buffer = await tools.pdf({ url, width, height });
  await tools.save({ filename: 'pdf.pdf', buffer });
});
