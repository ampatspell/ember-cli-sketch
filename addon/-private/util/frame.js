export const overlapsFrame = ({ x, y, width, height }, frame) => {
  return x < frame.x + frame.width && x + width > frame.x && y < frame.y + frame.height && y + height > frame.y;
}

export const excludesFrame = ({ x, y, width, height }, frame) => {
  return x + width < frame.x || x > frame.x + frame.width || y + height < frame.y || y > frame.y + frame.height;
}
