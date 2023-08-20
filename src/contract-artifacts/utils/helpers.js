import axios from "axios";

const BACKENDURL =
  import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_TEST_BACKEND_URL;

export const getUserDomainNames = async (user, options) => {
  let domains;
  console.log(typeof options?.chainId);
  if (options) {
    domains = await axios.get(`${BACKENDURL}/${user}/${options.chainId}`);
  }
  return domains.data;
};
