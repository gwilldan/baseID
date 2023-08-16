import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className=" dark:bg-dark1 bg-secBlue w-full h-screen flex flex-col">
        <Nav theme={theme} setTheme={setTheme} />
          <main className="w-full flex flex-col h-full">{children}</main>
        <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
