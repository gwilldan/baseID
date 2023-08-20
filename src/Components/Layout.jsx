import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

import Nav from "./Nav";
import Footer from "./Footer";
import WalletConnect from "./WalletConnect";

const Layout = () => {
  // STATE FOR MODAL CHANG
  const [modalToggle, setModalToggle] = useState(false);
  const [theme, setTheme] = useState("light");

  // useEffect(() => {
  //   const handleOnline = () => {
  //     console.log("i ran online");
  //     toast.info("You are online");
  //   };
  //   const handleOffline = () => {
  //     console.log("I ran offline");
  //     toast.info("You are offline, reconnect and try again...");
  //   };

  //   window.addEventListener("online", handleOnline);
  //   window.addEventListener("offline", handleOffline);

  //   return () => {
  //     window.removeEventListener(handleOnline);
  //     window.removeEventListener(handleOffline);
  //   };
  // }, []);

  // STATE OF HAMBURGER TOGGLE
  const [isOpen, setOpen] = useState(false);

  return (
    <div className=" w-full flex flex-col  h-screen md-h-auto">
      <Nav
        theme={theme}
        setTheme={setTheme}
        modalToggle={modalToggle}
        setModalToggle={setModalToggle}
        isOpen={isOpen}
        setOpen={setOpen}
      />
      <main className="no-scrollbar overflow-auto w-full h-full flex flex-col md:h-full">
        {<Outlet />}
      </main>
      <WalletConnect
        modalToggle={modalToggle}
        setModalToggle={setModalToggle}
        setOpen={setOpen}
      />
      <Footer />
    </div>
  );
};

export default Layout;

// useEffect(() => {
//   switchNetwork?.(chains.find((chain) => chain.network === network)?.id);
// }, [address, chains, chain, network, switchNetwork]);
