import { Fragment, useRef, useState } from "react";
import PropTypes from "prop-types";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ReadPrice from "./Functional/ReadPrice";
import ReadName from "./Functional/ReadName";
import { abi } from "../contract-artifacts/abi";

import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {
  extractErrorDetails,
  parseErrorDetails,
  shortenAddress,
} from "../utils/helper";
import { ethers } from "ethers";

function DisplayCard({ searchedName, setSearchedName, setToggle }) {
  //GROUP STYLING FOR DISPLAY CARD
  const cardStyle = "border-b border-[#17338F] py-4 md:border-none";
  const dataStyle = "text-lg font-bold";

  const [year, setYear] = useState(1);
  const [eth, setEth] = useState(0.002);
  const [isNameAvail, setIsNameAvail] = useState(false);
  const [ownerAddress, setOwnerAddress] = useState("");
  const [price, setPrice] = useState("");
  const { isConnected } = useAccount();
  const toastRef = useRef("");

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

  const { config, error, isError } = usePrepareContractWrite({
    address: import.meta.env.VITE_CA,
    abi,
    functionName: "registerDomain",
    args: [searchedName],
    value: ethers.parseEther(price ? price : "0"),
  });

  const {
    data: txHash,
    write,
    isLoading: mintIsLoading,
    isError: isMintingError,
    error: mintingError,
  } = useContractWrite(config, {
    onError(error) {
      const parseError = parseErrorDetails(error.message);
      if (parseError.error?.includes("insufficient funds")) {
        toast.error(
          `insufficient funds, user have ${
            parseError.haveGas
          } Gas, function wants ${ethers.formatEther(parseError.wantGas)} Gas`
        );
      }
    },
  });

  const {
    data,
    isSuccess,
    isLoading,
    isFetching,
    isFetched,
    isError: txIsError,
  } = useWaitForTransaction({
    hash: txHash?.hash,
  });

  const displayMiningTx = () => {
    toastRef.current = toast.loading(
      <p>
        {" "}
        <strong>{searchedName}</strong> domain name is being minted, please wait
        ...
      </p>
    );
  };

  const updateMining = (isError) => {
    toast.update(toastRef.current, {
      render: (
        <p>
          {isError
            ? `Error minting ${searchedName}, name may already exists`
            : `${searchedName} has been minted successfully`}
          <br />
          <a
            style={{ textDecoration: "underline" }}
            href={`${import.meta.env.VITE_DEV_SCAN}/${data?.transactionHash}`}
            target="_blank"
            rel="noreferrer"
          >
            view transaction details on basescan
          </a>
        </p>
      ),
      type: isError ? "error" : "success",
      isLoading: false,
      autoClose: "5000",
    });
  };

  if (isFetching && !data) {
    displayMiningTx();
  }

  if (isSuccess && isFetched && !isFetching && data) {
    updateMining(txIsError);
    setToggle(false);
    setSearchedName("");
  } else if (isError) {
    updateMining(txIsError);
  }

  if (isMintingError) {
    toast.error(extractErrorDetails(mintingError));
  }

  const handleError = (error) => {
    const parsedError = extractErrorDetails(error);
    if (parsedError?.includes("insufficient funds")) return "Insufficient ETH";
    else return "Register";
  };

  return (
    <motion.div
      initial="start"
      animate="stop"
      variants={animVariant}
      className={`bg-secondary-color md:h-[75px] rounded-3xl my-6 px-2 pb-5 md:p-5 flex flex-col md:flex-row  ${
        !isNameAvail && "md:justify-between"
      } md:gap-16 md:items-center`}
    >
      <ReadName
        args={searchedName}
        tld={tld}
        setIsNameAvail={setIsNameAvail}
        setOwnerAddress={setOwnerAddress}
      />
      {isNameAvail ? (
        <div
          className={`border-b border-[#17338F] py-4 md:border-none  border-none `}
        >
          <p className=" dark:text-white text-lg font-bold">Owner</p>

          <p className=" dark:font-semibold dark:text-white tracking-widest">
            {shortenAddress(ownerAddress, 12, 30) || "0x"}
          </p>
        </div>
      ) : (
        <Fragment>
          <div className={cardStyle}>
            <div className=" flex items-center gap-2">
              <button onClick={subtract} className=" text-priBlue text-xl">
                <AiOutlineMinusCircle />
              </button>
              <p className={`${dataStyle}  dark:text-white`}>{year} Year</p>
              <button onClick={add}>
                <AiOutlinePlusCircle className=" text-priBlue text-xl" />
              </button>
            </div>
            <p className=" dark:font-semibold dark:text-white">
              Registration Period
            </p>
          </div>

          <ReadPrice args={searchedName} setPrice={setPrice} />

          <button
            disabled={isNameAvail || mintIsLoading || !write}
            className={` ${
              isNameAvail || "hover:bg-blue-500 active:bg-priBlue"
            }  md:w-[200px] rounded-2xl font-semibold h-12 bg-priBlue text-white disabled:opacity-50 `}
            onClick={() => write?.()}
          >
            {isLoading
              ? "Minting ..."
              : isError
              ? handleError(error.message)
              : !isConnected
              ? "Connect Wallet"
              : "Register"}
          </button>
        </Fragment>
      )}
    </motion.div>
  );
}

DisplayCard.propTypes = {
  searchedName: PropTypes.string,
  setSearchedName: PropTypes.func,
  setToggle: PropTypes.func,
};

export default DisplayCard;
