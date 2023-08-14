import PropTypes from "prop-types";
import { useContractRead } from "wagmi";
import { abi } from "../../contract-artifacts/abi";
import { ethers } from "ethers";
import { useEffect } from "react";
const ReadName = ({ args, tld, setIsNameAvail }) => {
  const {
    data: ownerAddress,
    isError,
    error,
    isLoading,
  } = useContractRead({
    address: import.meta.env.VITE_CA,
    abi,
    functionName: "getDomainAddress",
    args: [`${args}.${tld}`],
    chainId: import.meta.env.VITE_DEV_CHAIN_ID,
  });

  console.log(isError);
  console.log(error);
  console.log(isLoading);

  const isNotZeroAddress = ownerAddress !== ethers.ZeroAddress;

  useEffect(() => {
    setIsNameAvail(isNotZeroAddress);
  }, [args]);

  return (
    <div className="border-b border-[#17338F] py-4 md:border-none">
      <p className="text-lg font-bold">{args}.base</p>
      {isNotZeroAddress ? (
        <p className="text-red-600">Unavailable</p>
      ) : (
        <p className=" text-green-600">Available</p>
      )}
      {/*  */}
    </div>
  );
};

ReadName.propTypes = {
  args: PropTypes.string,
  tld: PropTypes.string,
  setIsNameAvail: PropTypes.func,
};

export default ReadName;
