import { useState } from "react";
import { Outlet } from "react-router-dom";

import Nav from "./Nav";
import Footer from "./Footer";
import WalletConnect from "./WalletConnect";

const Layout = () => {
  const [theme, setTheme] = useState("light");

  // STATE FOR MODAL CHANG
  const [modalToggle, setModalToggle] = useState(false);

  // STATE OF HAMBURGER TOGGLE
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="bg-primary-color w-full h-screen flex flex-col">
      <Nav
        theme={theme}
        setTheme={setTheme}
        modalToggle={modalToggle}
        setModalToggle={setModalToggle}
        isOpen={isOpen}
        setOpen={setOpen}
      />
      <main className="w-full flex flex-col h-full">{<Outlet />}</main>
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
