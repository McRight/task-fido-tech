// * NB: the task says "plot the points *clearly with different colours*" - I am not sure how to interpret it but if this means that the colors need to be "as different from each other as possible", I would pass the existing colors as prop and calculate the "distance" between the colors

export function getRandomColor() {
  // HSL values to avoid white or light colors
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 61) + 40;
  const lightness = Math.floor(Math.random() * 41) + 20;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
