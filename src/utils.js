export const range = (start, end, step = 1, reverse = false) => {
  let output = [];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }

  if (reverse) {
    output.reverse();
  }

  return output;
};
