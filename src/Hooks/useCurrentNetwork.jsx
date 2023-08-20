import { NetworkContext } from "../context/networkProvider";
import { useContext } from "react";

const useCurrentNetwork = () => {
  const { network, setNetwork } = useContext(NetworkContext);

  return {
    network,
    setNetwork,
  };
};

export default useCurrentNetwork;
