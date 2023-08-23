import { useContractRead } from "wagmi";

import { abi } from "../contract-artifacts/abi";

const useGetSeletedName = (address) => {
  // let watchValue = refetch?.refetch;

  const { data: domainName, refetch } = useContractRead({
    address: address ? import.meta.env.VITE_CA : "",
    abi,
    functionName: "getAssociatedName",
    args: [address],
    structuralSharing: (prev, next) => (prev === next ? prev : next),
  });

  return { domainName, refetch };
};

export default useGetSeletedName;
