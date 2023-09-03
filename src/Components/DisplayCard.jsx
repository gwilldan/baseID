import { Fragment, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ReadPrice from "./Functional/ReadPrice";
import ReadName from "./Functional/ReadName";
import { abi } from "../contract-artifacts/abi";

import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { extractErrorDetails, shortenAddress } from "../utils/helperFunctions";
import { ethers } from "ethers";

function DisplayCard({ searchedName, setSearchedName, setToggle, tld }) {
  const [isNameAvail, setIsNameAvail] = useState(false);
  const [ownerAddress, setOwnerAddress] = useState("");
  const [price, setPrice] = useState("");
  const { isConnected } = useAccount();
  const toastRef = useRef("");

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
      const parseError = extractErrorDetails(error.message);
      if (parseError?.includes("insufficient funds")) {
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
    isFetchedAfterMount,
    isFetching,
    isFetched,
    isIdle,
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

  useEffect(() => {
    if (isLoading && !isFetchedAfterMount && !data) {
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
  }, [isMintingError, isIdle]);

  console.log(isFetchedAfterMount);

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
  tld: PropTypes.string,
};

export default DisplayCard;
