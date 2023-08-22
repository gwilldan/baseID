import { useContractRead } from "wagmi";

import { abi } from "../contract-artifacts/abi";

const useGetSeletedName = (address, refetch) => {
  let watchValue = refetch?.refetch;

  const { data: domainName } = useContractRead({
    address: import.meta.env.VITE_CA,
    abi,
    functionName: "getAssociatedName",
    args: [address],
    // watch: refetch?.refetch ? true : false,
    watch: watchValue,
    structuralSharing: (prev, next) => (prev === next ? prev : next),
  });

  return { domainName };
};

export default useGetSeletedName;
