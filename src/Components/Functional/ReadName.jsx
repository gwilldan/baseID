import PropTypes from "prop-types";
import { useContractRead, useNetwork } from "wagmi";
import { abi } from "../../contract-artifacts/abi";
import { ethers } from "ethers";
import { useEffect } from "react";
const ReadName = ({ args, setIsNameAvail, setOwnerAddress, tld }) => {
  const { data: ownerAddress } = useContractRead({
    address: import.meta.env.VITE_CA,
    abi,
    functionName: "getDomainAddress",
    args: [args],
    chainId: import.meta.env.VITE_DEV_CHAIN_ID,
  });

  console.log(ownerAddress);

  const isNotZeroAddress = ownerAddress !== ethers.ZeroAddress;

  useEffect(() => {
    setIsNameAvail(ownerAddress !== ethers.ZeroAddress);
    setOwnerAddress(ownerAddress);
  }, [args, ownerAddress, setIsNameAvail, setOwnerAddress]);

  return (
    <div className="border-b border-[#17338F] py-4 md:border-none">
      <p className=" dark:text-white text-lg font-bold">
        {args}.{tld || "base"}
      </p>
      {isNotZeroAddress && <p className="text-red-600">Unavailable</p>}
      {!isNotZeroAddress && args.length >= 3 && (
        <p className=" text-green-600">Available</p>
      )}
      {!isNotZeroAddress && args.length < 3 && (
        <p className="text-red-600"> incorrect name length </p>
      )}
    </div>
  );
};

ReadName.propTypes = {
  args: PropTypes.string,
  tld: PropTypes.string,
  setIsNameAvail: PropTypes.func,
  setOwnerAddress: PropTypes.func,
};

export default ReadName;
