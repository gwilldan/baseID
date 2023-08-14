// import react, { useState } from "react";
import HomePage from "./Pages/HomePage";

// WEB3 IMPORTS
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { mainnet, sepolia, base } from "@wagmi/core/chains";

import { publicProvider } from "wagmi/providers/public";

//FILE IMPORTS
import { Nav, Footer } from "./Components";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";
import { InjectedConnector } from "wagmi/connectors/injected";

const { chains, publicClient } = configureChains(
  [mainnet, sepolia, base],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_KEY }),
    publicProvider(),
  ]
);

const config = createConfig({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  publicClient,
});

function App() {
  return (
    <>
      <WagmiConfig config={config}>
        <div className=" relative bg-secBlue bg-backSVG h-screen w-screen bg-no-repeat bg-cover bg-center ">
          <Nav />
          <HomePage />
          <div className=" absolute w-full bottom-0">
            <Footer />
          </div>
        </div>
      </WagmiConfig>
    </>
  );
}

export default App;
