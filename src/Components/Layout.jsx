import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

import Nav from "./Nav";
import Footer from "./Footer";
import WalletConnect from "./WalletConnect";

const Layout = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  // STATE FOR MODAL CHANG
  const [modalToggle, setModalToggle] = useState(false);

  // STATE OF HAMBURGER TOGGLE
  const [isOpen, setOpen] = useState(false);
  //dark:bg-dark1
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

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
