import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Logo, LogoDark } from "../Assets";
import { Button, MobileNav } from "../Components";
import { FiMoon, FiSun } from "react-icons/fi";
import { useAccount, useSwitchNetwork } from "wagmi";
import {Squash} from "hamburger-react"
import {motion} from "framer-motion"
import { NavLink } from "react-router-dom";

function Nav({ theme, setTheme, modalToggle, setModalToggle , setOpen, isOpen}) {
  const { chains, switchNetwork } = useSwitchNetwork();
  const { address } = useAccount();

  useEffect(() => {
    switchNetwork?.(chains[0].id);
  }, [address]);


  const toggling = () => {
    setOpen(!isOpen)
  }


  const anim = {
    begin: {
      y: 0,
      display: "hidden",
      opacity: 0
    },

    end: {
      y: 70,
      display: "block",
      opacity: 1
    }
  }

  return (
    <div className=" dark:bg-priBlack bg-secBlue z-50 sticky w-full top-0 py-6 h-[70px] md:h-[100px] border-b border-priBlue 
      flex justify-between md:pt-[40px] px-small md:px-[40px] 
      lg:px-Large pb-small "
    >
     
      <div className=" flex items-center">
        <img
          src={theme === "light" ? Logo : LogoDark}
          alt="logo"
          className=" h-5 md:h-8 "
        />
      </div>


      <div className=" flex gap-4 items-center">
        
        <NavLink to="./" className=" hover:text-priBlue text-lg hidden md:block font-semibold " >
          Home
        </NavLink>
        <NavLink to="./Profile" className=" hover:text-priBlue text-lg hidden md:block font-semibold " >
          Profile
        </NavLink>

        <button
          className=""
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
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
            size = {28}
            toggled ={isOpen}
            toggle = {toggling}
            easing = "ease-in"
          />
        </div>
        
        <div className=" hidden md:block">
          <Button modalToggle={modalToggle} setModalToggle={setModalToggle}/>
        </div>
      </div>

                {/*  MOBILE NAV */}
      <motion.div 
        variants={anim}
        initial = "begin"
        animate = {
          isOpen ? "end" : "begin"
        }
        className=" -z-50 hidden md:hidden w-full absolute bottom-0 
         ml-[-20px] shadow-xl"
      >
        <MobileNav  setOpen={setOpen} modalToggle={modalToggle} setModalToggle={setModalToggle}/>
      </motion.div>
    </div>
  );
}

Nav.propTypes = {
  theme: PropTypes.string,
  setTheme: PropTypes.func,
};

export default Nav;
