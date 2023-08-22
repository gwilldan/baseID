import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const NetworkContext = createContext(null);

const NetworkProvider = ({ children }) => {
  const [network, setNetwork] = useState("base-goerli");
  const [domainName, setDomainName] = useState("");

  return (
    <>
      <NetworkContext.Provider
        value={{ network, setNetwork, domainName, setDomainName }}
      >
        {children}
      </NetworkContext.Provider>
    </>
  );
};

NetworkProvider.propTypes = {
  children: PropTypes.node,
};

export default NetworkProvider;
