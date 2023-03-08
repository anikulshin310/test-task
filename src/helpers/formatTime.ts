export const formatTime = (string: string, pad: string, length: number) =>
  (new Array(length + 1).join(pad) + string).slice(-length);
