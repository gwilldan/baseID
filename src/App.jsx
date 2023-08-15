// WEB3 IMPORTS
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { mainnet, sepolia, base } from "@wagmi/core/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";
import { InjectedConnector } from "wagmi/connectors/injected";

import { Toaster } from "react-hot-toast";

//FILE IMPORTS
import HomePage from "./Pages/HomePage";
import { Nav, Footer } from "./Components";

const { chains, publicClient } = configureChains(
  [sepolia, mainnet, base],
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
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#17338F",
              color: "#fff",
            },
          }}
        />
      </WagmiConfig>
    </>
  );
}

export default App;
