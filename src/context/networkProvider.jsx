import { createContext, useState } from "react";

export const NetworkContext = createContext(null);

const NetworkProvider = ({ children }) => {
  const [network, setNetwork] = useState("sepolia");

  return (
    <>
      <NetworkContext.Provider value={{ network, setNetwork }}>
        {children}
      </NetworkContext.Provider>
    </>
  );
};

export default NetworkProvider;
