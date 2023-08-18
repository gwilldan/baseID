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
