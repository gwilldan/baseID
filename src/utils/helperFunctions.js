export const shortenAddress = (_add, startLength, endLength) => {
  if (_add === undefined) return "0x";
  if (startLength && endLength) {
    return _add?.slice(0, startLength) + "..." + _add?.slice(endLength, 42);
  } else return _add?.slice(0, 6) + " ... " + _add?.slice(38, 42);
};

export const extractErrorDetails = (errorMessage) => {
  const message =
    typeof errorMessage === "object" ? errorMessage.message : errorMessage;

  const detailsIndex = message.indexOf("Details:");
  if (detailsIndex !== -1) {
    const detailsStart = detailsIndex + "Details:".length;
    const firstFullStop = message.indexOf(".", detailsStart);
    if (firstFullStop !== -1) {
      const extractedDetails = message?.substring(
        detailsStart,
        firstFullStop + 1
      );
      return extractedDetails?.trim();
    }
  }
  return "";
};

export const parseError = (errorMessage) => {
  if (errorMessage?.code === -32002)
    return "Request of type 'wallet_requestPermissions' already pending, check metamask";
  else if (errorMessage?.code === 40001) return "User rejected the request";
};
