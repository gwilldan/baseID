import { BrowserRouter, Routes, Route } from "react-router-dom";

// WEB3 IMPORTS
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { mainnet, sepolia, base, baseGoerli } from "@wagmi/core/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//FILE IMPORTS
import { HomePage, DMail, Profile } from "./Pages";
import Layout from "./Components/Layout";
import NetworkProvider from "./context/networkProvider";

const { chains, publicClient } = configureChains(
  [base, baseGoerli, sepolia, mainnet],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        ({
          http: `https://rpc.ankr.com/${chain.name.toLowerCase()}/${
            import.meta.env.VITE_ANKR_KEY
          }`,
        });
      },
      stallTimeout: 1000,
    }),
    alchemyProvider({
      apiKey: import.meta.env.VITE_ALCHEMY_KEY,
      stallTimeout: 1000,
    }),
    publicProvider(),
  ]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "baseid.domain",
        jsonRpcUrl: `https://eth-mainnet.alchemyapi.io/v2/${
          import.meta.env.VITE_ALCHEMY_KEY
        }`,
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
        metadata: {
          name: "Base ID",
          description: "my domain app",
          url: import.meta.env.VITE_APP_URL,
          icons: ["https://wagmi.sh/icon.png"],
        },
      },
    }),
  ],
  publicClient,
});

function App() {
  return (
    <>
      <div className=" no-scrollbar"></div>
      <NetworkProvider>
        <WagmiConfig config={config}>
          <div
            className=" relative dark:bg-dark1 bg-secBlue 
           bg-[url('./Assets/BACKGROUND.svg')] w-screen bg-no-repeat bg-[length:1200px_2000px] bg-center md:bg-cover
          md:bg-center no-scrollbar "
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="" element={<HomePage />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/d-mail" element={<DMail />} />
                </Route>
              </Routes>
            </BrowserRouter>

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
      </NetworkProvider>
    </>
  );
}

export default App;
