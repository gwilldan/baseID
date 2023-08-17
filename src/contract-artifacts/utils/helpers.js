import { ethers } from "ethers";
import { abi } from "../abi";

const CA = import.meta.env.VITE_CA;
const RPC = import.meta.env.VITE_ALCHEMY_RPC;

// Create provider
const provider = new ethers.JsonRpcProvider(RPC);

const contract = new ethers.Contract(CA, abi, provider);

export const getUserSelectedName = async (user) => {
  const eventFilter = contract.filters.DomainRegistered(user, null, null);
  const logs = await contract.queryFilter(eventFilter);

  const mintedNames = logs.map((log) => log.args.domainName);
  return mintedNames;
};
