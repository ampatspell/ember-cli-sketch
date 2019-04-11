let runtime = require('./runtime');

runtime(async tools => {
  let id = 'single';
  let width = 1024;
  let height = 1024;

  let url = `http://localhost:3000/experiments/editors/${id}/image`;

  let buffer = await tools.image({ url, width, height });
  await tools.save({ filename: 'image.png', buffer });
});
