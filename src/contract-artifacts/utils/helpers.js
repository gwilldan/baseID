import { ethers } from "ethers";
import { abi } from "../abi";

const CA = import.meta.env.VITE_CA;
const ALCHEMYRPC = import.meta.env.VITE_ALCHEMY_RPC;
const ANKRPC = import.meta.env.VITE_ANKR_RPC;
const ANKRPC_GOERLI = import.meta.env.VITE_ANKR_RPC_GOERLI;
const FROM_BLOCK = 4070430;

const chains = {
  sepolia: {
    rpc: ALCHEMYRPC,
  },
  base: {
    rpc: ANKRPC,
  },
  "base-goerli": {
    rpc: ANKRPC_GOERLI,
  },
};

//https://rpc.ankr.com/base_goerli/e28d7c9203a3e9dc17405468cc7cc4386f86a5d811329c307b80168e23421028
//https://rpc.ankr.com/base_goerli/e28d7c9203a3e9dc17405468cc7cc4386f86a5d811329c307b80168e23421028

export const getUserDomainNames = async (user, options) => {
  if (!user) return;

  const rpc = chains[options.network].rpc;
  console.log(rpc);
  console.log(ANKRPC_GOERLI);

  // Create provider
  const provider = new ethers.JsonRpcProvider(rpc);
  console.log(provider);
  const contract = new ethers.Contract(CA, abi, provider);

  const eventFilter = contract.filters.DomainRegistered(user, null, null);
  const logs = await contract.queryFilter(eventFilter, FROM_BLOCK);

  let domains = [];
  if (options) {
    domains = logs.map((log, i) => {
      return {
        id: i + 1,
        domain: log.args.domainName,
        controller: options.selectedName === log.args.domainName, // CORRECT WAY IF CONTRACT MAKES PROVISIONS
      };
    });
  } else {
    domains = logs.map((log) => log.args.domainName);
  }

  return domains;
};
