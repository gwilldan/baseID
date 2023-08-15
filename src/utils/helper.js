export const shortenAddress = (_add) => {
  return _add.slice(0, 6) + "..." + _add.slice(38, 42);
};

export const parseErrorDetails = (errorMessage) => {
  const detailsMatch =
    /err: insufficient funds for gas \* price \+ value: address 0x[0-9a-fA-F]+ have (\d+) want (\d+) \(supplied gas \d+\)/.exec(
      errorMessage
    );

  if (!detailsMatch) {
    return null; // Unable to parse the error details
  }

  const error = detailsMatch[0];
  const haveGas = detailsMatch[1];
  const wantGas = detailsMatch[2];

  return {
    error,
    haveGas,
    wantGas,
  };
};
