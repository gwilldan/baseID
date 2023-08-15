import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

import { InputField, DisplayCard } from "../Components";

function HomePage() {
  const [toggle, setToggle] = useState(false);
  const [searchedName, setSearchedName] = useState("");

  // animation controls
  const animVariant = {
    begin: {
      opacity: 0,
      y: -20,
    },

    end: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        when: "beforeChildren",
      },
    },
  };

  const childVariant = {
    begin: {
      opacity: 0,
      y: -20,
    },

    end: {
      opacity: 1,
      y: 0,
    },
  };

  const search = () => {
    if (searchedName.length < 3) {
      console.log("Name cannot be less than 3"); // replace with react hot toast
      return;
    }
    setToggle(!toggle);
  };

  // console.log(data);

  return (
    <motion.div
      variants={animVariant}
      initial="begin"
      animate="end"
      transition="transit"
      className=" mt-[90px] md:mt-[130px] px-small md:px-[40px] lg:px-Large rounded-sm"
    >
      <div className=" max-w-[700px] ">
        <motion.p className=" dark:text-white text font-extrabold text-3xl md:text-7xl mb-2">
          Your Base identity <br /> Starts Here
        </motion.p>
        <motion.p variants={childVariant} className="  dark:text-white font-normal md:text-lg ">
          Secure your base domain as you navigate through the Base ecosystem
        </motion.p>
      </div>

      <motion.div variants={childVariant}>
        <InputField
          onChange={(e) => setSearchedName(e.target.value)}
          endAdornment={
            <>
              <p className=" md:mr-4 md:text-xl">.base</p>
              <button
                onClick={search}
                className="hover:scale-[1.2] text-priBlue active:text-red-500 active:scale-[1px] hover:text-priBlack hover:duration-75 hover:ease flex justify-center items-center"
              >
                <FiSearch className=" md:text-3xl text-2xl" />
              </button>
            </>
          }
        />
      </motion.div>

      {toggle && (
        <DisplayCard
          toggle={toggle}
          setToggle={setToggle}
          searchedName={searchedName}
        />
      )}
    </motion.div>
  );
}

export default HomePage;
