// import react, { useState } from "react";
import HomePage from "./Pages/HomePage";

// WEB3 IMPORTS
import {
  WagmiConfig,
  createConfig,
  configureChains,
  mainnet,
  sepolia,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";

//FILE IMPORTS
import { Nav, Footer } from "./Components";

const { publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
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
