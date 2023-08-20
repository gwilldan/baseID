import axios from "axios";

// export const getUserDomainNames = async (user, options) => {
//   if (!user) return;

//   const rpc = chains[options.network].rpc;
//   console.log(rpc);
//   console.log(ANKRPC_GOERLI);

//   // Create provider
//   const provider = new ethers.JsonRpcProvider(rpc);
//   console.log(provider);
//   const contract = new ethers.Contract(CA, abi, provider);

//   const eventFilter = contract.filters.DomainRegistered(user, null, null);
//   const logs = await contract.queryFilter(eventFilter, FROM_BLOCK);

//   let domains = [];
//   if (options) {
//     domains = logs.map((log, i) => {
//       return {
//         id: i + 1,
//         domain: log.args.domainName,
//         controller: options.selectedName === log.args.domainName, // CORRECT WAY IF CONTRACT MAKES PROVISIONS
//       };
//     });
//   } else {
//     domains = logs.map((log) => log.args.domainName);
//   }

//   return domains;
// };

export const getUserDomainNames = async (user, options) => {
  let domains;
  console.log(typeof options?.chainId);
  if (options) {
    domains = await axios.get(
      `http://localhost:9000/api/user-domains/${user}/${options.chainId}`
    );
  }
  return domains.data;
};
