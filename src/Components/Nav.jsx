import PropTypes from "prop-types";
import { Logo, LogoDark } from "../Assets";
import { Button, MobileNav } from "../Components";

import { useDarkMode } from "../Hooks/useTheme";
import { FiMoon, FiSun } from "react-icons/fi";
import { Squash } from "hamburger-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

function Nav({ modalToggle, setModalToggle, setOpen, isOpen }) {
  const { theme, themeToggler } = useDarkMode();

  const toggling = () => {
    setOpen(!isOpen);
  };

  const anim = {
    begin: {
      y: 0,
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
        <div className=" dark:text-white md:hidden">
          <Squash
            hideOutline={true}
            size={28}
            toggled={isOpen}
            toggle={toggling}
            easing="ease-in"
          />
        </div>

        <div className=" hidden md:block">
          <Button setModalToggle={setModalToggle} setOpen={setOpen} />
        </div>
      </div>

      {/*  MOBILE NAV */}
      <motion.div
        variants={anim}
        initial="begin"
        animate={isOpen ? "end" : "begin"}
        className=" -z-50 hidden md:hidden w-full absolute bottom-0 
         ml-[-20px] shadow-xl"
      >
        <MobileNav
          setOpen={setOpen}
          modalToggle={modalToggle}
          setModalToggle={setModalToggle}
        />
      </motion.div>
    </div>
  );
}

Nav.propTypes = {
  theme: PropTypes.string,
  setTheme: PropTypes.func,
  modalToggle: PropTypes.bool,
  setModalToggle: PropTypes.func,
  setOpen: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default Nav;
