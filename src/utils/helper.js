export const shortenAddress = (_add) => {
  return _add.slice(0, 6) + "..." + _add.slice(38, 42);
};
