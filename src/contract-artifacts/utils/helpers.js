import { ethers } from "ethers";
import { abi } from "../abi";

const CA = import.meta.env.VITE_CA;
const RPC = import.meta.env.VITE_ALCHEMY_RPC;

// Create provider
const provider = new ethers.JsonRpcProvider(RPC);

const contract = new ethers.Contract(CA, abi, provider);

export const getUserDomainNames = async (user, options) => {
  if (!user) return;

  const eventFilter = contract.filters.DomainRegistered(user, null, null);
  const logs = await contract.queryFilter(eventFilter);

  let domains = [];
  if (options) {
    domains = logs.map((log, i) => {
      return {
        id: i + 1,
        domain: log.args.domainName,
        // controller: options.selectedName === log.args.domainName, // CORRECT WAY IF CONTRACT MAKES PROVISIONS
        controller: log.args.domainName === logs?.[0]?.args.domainName, // make shift to accomodate error in contract
      };
    });
  } else {
    domains = logs.map((log) => log.args.domainName);
  }

  return domains;
};
