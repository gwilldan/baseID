import { useContractRead } from "wagmi";
import PropTypes from "prop-types";
import { ethers } from "ethers";

import { abi } from "../../contract-artifacts/abi";
import { useEffect } from "react";

const ReadPrice = ({ args, setPrice }) => {
  const { data: bigNumberPrice, isLoading } = useContractRead({
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
  console.log(price);
  useEffect(() => {
    setPrice(price);
  }, [price]);

  return (
    <div className="border-b border-[#17338F] py-4 md:border-none  border-none">
      {isLoading ? (
        <p className=" dark:text-white">Fetching price</p> 
      ) : (
        <p className=" dark:text-white text-lg font-bold">
          {price === undefined ? "Unrecognized name length" : `${price} eth`}
        </p>
      )}
      {/* {isError && <p className="text-lg font-bold">{error.name}</p>} */}
      <p className=" dark:font-semibold dark:text-white">Registration Price</p>
    </div>
  );
};

ReadPrice.propTypes = {
  args: PropTypes.string,
  setPrice: PropTypes.func,
};

export default ReadPrice;
