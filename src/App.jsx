// WEB3 IMPORTS
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { mainnet, sepolia, base } from "@wagmi/core/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";
import { InjectedConnector } from "wagmi/connectors/injected";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//FILE IMPORTS
import HomePage from "./Pages/HomePage";
import Layout from "./Components/Layout";

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
        <div className=" relative dark:bg-dark1 bg-secBlue bg-backSVG min-h-screen w-screen bg-no-repeat bg-cover bg-center ">
          <Layout>
            <HomePage />
          </Layout>
          {/* <div className="w-full">
            
          </div> */}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </WagmiConfig>
    </>
  );
}

export default App;
