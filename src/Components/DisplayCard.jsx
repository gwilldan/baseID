import { useState } from "react";
import PropTypes from "prop-types";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import ReadPrice from "./Functional/ReadPrice";
import ReadName from "./Functional/ReadName";
import { abi } from "../contract-artifacts/abi";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { parseErrorDetails } from "../utils/helper";
import { ethers } from "ethers";

function DisplayCard({ toggle, setToggle, searchedName }) {
  //GROUP STYLING FOR DISPLAY CARD
  const cardStyle = "border-b border-[#17338F] py-4 md:border-none";
  const dataStyle = "text-lg font-bold";

  const [year, setYear] = useState(1);
  const [eth, setEth] = useState(0.002);
  const [isNameAvail, setIsNameAvail] = useState(false);
  const [price, setPrice] = useState("");

  const add = () => {
    const newYear = year + 1;
    setYear(newYear);
    const newEth = (0.002 * newYear).toFixed(3);
    setEth(newEth);
  };
  const subtract = () => {
    if (year === 1) {
      setYear(year);
      setEth(eth);
    } else {
      setYear(year - 1);
      const newEth = (eth - 0.002).toFixed(3);
      setEth(newEth);
    }
  };

  const animVariant = {
    start: {
      opacity: 0,
      y: -40,
    },

    stop: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 10,
      },
    },
  };

  const { data: tld } = useContractRead({
    address: import.meta.env.VITE_CA,
    abi: abi,
    functionName: "tld",
  });

  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_CA,
    abi,
    functionName: "registerDomain",
    args: [searchedName],
    value: ethers.parseEther(price ? price : "0"),
  });

  const { data: txHash, write } = useContractWrite(config, {
    onError(error) {
      const parseError = parseErrorDetails(error.message);
      console.log(parseError.error.includes("insufficient funds"));
      if (parseError.error?.includes("insufficient funds")) {
        toast.error(
          `insufficient funds, user have ${
            parseError.haveGas
          } Gas, function wants ${ethers.formatEther(parseError.wantGas)} Gas`
        );
      }
    },
  });

  const { data, isError, isLoading, isSuccess, isFetching, isFetched } =
    useWaitForTransaction({
      hash: txHash,
    });

  console.log(data);

  return (
    <motion.div
      initial="start"
      animate="stop"
      variants={animVariant}
      className={` md:h-[75px] rounded-3xl my-6 px-2 pb-5 md:p-5 bg-lightBlue flex flex-col md:flex-row md:justify-between md:items-center`}
    >
      <ReadName args={searchedName} tld={tld} setIsNameAvail={setIsNameAvail} />

      <div className={cardStyle}>
        <div className=" flex items-center gap-2">
          <button onClick={subtract} className=" text-priBlue text-xl">
            <AiOutlineMinusCircle />
          </button>
          <p className={dataStyle}>{year} Year</p>
          <button onClick={add}>
            <AiOutlinePlusCircle className=" text-priBlue text-xl" />
          </button>
        </div>
        <p>Registration Period</p>
      </div>
      <ReadPrice args={searchedName} setPrice={setPrice} />
      <button
        disabled={isNameAvail || !write}
        className=" md:w-[200px] rounded-2xl font-semibold h-12 bg-priBlue text-white disabled:opacity-50"
        onClick={() => write?.()}
      >
        Register
      </button>
    </motion.div>
  );
}

ReadPrice.propTypes = {
  searchedName: PropTypes.string,
};

export default DisplayCard;
