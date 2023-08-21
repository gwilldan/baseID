import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const NetworkContext = createContext(null);

const NetworkProvider = ({ children }) => {
  const [network, setNetwork] = useState("base-goerli");

  return (
    <>
      <NetworkContext.Provider value={{ network, setNetwork }}>
        {children}
      </NetworkContext.Provider>
    </>
  );
};

NetworkProvider.propTypes = {
  children: PropTypes.node,
};

export default NetworkProvider;
