import { useContractRead } from "wagmi";
import PropTypes from "prop-types";
import { ethers } from "ethers";

import { abi } from "../../contract-artifacts/abi";

const ReadPrice = ({ args }) => {
  const {
    data: bigNumberPrice,
    isError,
    error,
    isLoading,
  } = useContractRead({
    address: import.meta.env.VITE_CA,
    abi: abi,
    functionName: "price",
    args: [args],
    chainId: import.meta.env.VITE_DEV_CHAIN_ID,
  });

  const price =
    bigNumberPrice !== undefined
      ? ethers.formatEther(Number(bigNumberPrice).toString())
      : undefined;

  console.log(bigNumberPrice);

  return (
    <div className="border-b border-[#17338F] py-4 md:border-none  border-none">
      {isLoading ? (
        "Fetching price"
      ) : (
        <p className="text-lg font-bold">
          {price === undefined ? "Unrecognized name length" : `${price} eth`}
        </p>
      )}
      {isError && <p className="text-lg font-bold">{error}</p>}
      <p>Registration Price</p>
    </div>
  );
};

ReadPrice.propTypes = {
  args: PropTypes.string,
};

export default ReadPrice;
