import { useEffect } from "react";
import { Logo, LogoDark } from "../Assets";
import { Button, MobileNav } from "../Components";

import { useDarkMode } from "../Hooks/useTheme";
import { FiMoon, FiSun } from "react-icons/fi";
import { useAccount, useSwitchNetwork } from "wagmi";
import { Squash } from "hamburger-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import useCurrentNetwork from "../Hooks/useCurrentNetwork";
import useToggle from "../Hooks/useToggle";

function Nav() {
  const { chains, switchNetwork } = useSwitchNetwork();
  const { address } = useAccount();
  const { network } = useCurrentNetwork();

  const { handleToggle, toggle, toggleRef, toggledElementRef } = useToggle({
    eventType: "click",
  });

  const { theme, themeToggler } = useDarkMode();

  useEffect(() => {
    switchNetwork?.(chains.find((chain) => chain.network === network)?.id);
  }, [address, chains, switchNetwork]);

  const anim = {
    begin: {
      y: -70,
      display: "hidden",
      opacity: 0,
    },

    end: {
      y: 70,
      display: "block",
      opacity: 1,
    },
  };

  return (
    <div
      className=" bg-primary-color z-50 sticky w-full top-0 py-6 h-[70px] md:h-[100px] border-b border-priBlue 
      flex justify-between md:pt-[40px] px-small md:px-[40px] 
      xl:px-Large pb-small "
    >
      <div className=" flex items-center">
        <img
          src={theme === "light" ? Logo : LogoDark}
          alt="logo"
          className=" h-5 md:h-8 "
        />
      </div>

      <div className=" flex gap-4 items-center">
        <NavLink
          to="/"
          className={`${({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "active"
              : ""} hover:text-priBlue text-lg hidden md:block font-semibold dark:text-white `}
        >
          Home
        </NavLink>

        <NavLink
          to="/profile"
          className={`${({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "active"
              : ""} hover:text-priBlue text-lg hidden md:block font-semibold dark:text-white `}
        >
          Profile
        </NavLink>

        <NavLink
          to="/d-mail"
          className={`${({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "active"
              : ""} hover:text-priBlue text-lg hidden md:block font-semibold dark:text-white `}
        >
          D-Mail
        </NavLink>

        <button className="" onClick={() => themeToggler()}>
          {theme === "light" ? (
            <FiMoon className=" hover:text-priBlue text-2xl" />
          ) : (
            <FiSun className=" hover:text-priBlue text-2xl text-white" />
          )}
        </button>

        {/* HAMBURGER */}
        <div className=" dark:text-white md:hidden" ref={toggleRef}>
          <Squash
            hideOutline={true}
            size={28}
            toggled={toggle}
            toggle={handleToggle}
            easing="ease-in"
          />
        </div>

        <div className=" hidden md:block">
          <Button />
        </div>
      </div>

      {/*  MOBILE NAV */}
      <motion.div
        variants={anim}
        initial="begin"
        animate={toggle ? "end" : "begin"}
        className=" -z-50 hidden md:hidden w-full absolute bottom-0 
         ml-[-20px] shadow-xl"
      >
        <MobileNav
          setModalToggle={handleToggle}
          toggledElementRef={toggledElementRef}
        />
      </motion.div>
    </div>
  );
}

export default Nav;
