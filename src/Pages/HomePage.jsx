import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { animVariant, childVariant } from "../utils/anim";

import { InputField, DisplayCard } from "../Components";

function HomePage() {
  const [toggle, setToggle] = useState(false);
  const [searchedName, setSearchedName] = useState("");

  const search = () => {
    if (searchedName.length < 3) {
      toast.error("Name cannot be less than 3 characters");
      return;
    }
    setToggle(!toggle);
  };

  const handleNameChange = (e) => {
    const newValue = e.target.value.replace(/\s/g, "");
    setSearchedName(newValue.toLowerCase());
  };

  return (
    <motion.div
      variants={animVariant}
      initial="begin"
      animate="end"
      transition="transit"
      className=" mt-[90px] md:mt-[130px] px-small md:px-[40px] lg:px-Large rounded-sm"
    >
      <div className=" max-w-[700px] ">
        <motion.p className=" --accent-color text font-extrabold text-3xl md:text-7xl mb-2">
          Your Base identity <br /> Starts Here
        </motion.p>
        <motion.p
          variants={childVariant}
          className=" font-normal md:text-lg "
        >
          Secure your base domain as you navigate through the Base ecosystem
        </motion.p>
      </div>

      <motion.div variants={childVariant}>
        <InputField
          onChange={handleNameChange}
          onKeyDown={(e) => e.key === " " && e.preventDefault()}
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
          setSearchedName={setSearchedName}
        />
      )}
    </motion.div>
  );
}

export default HomePage;
