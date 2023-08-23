import { useEffect, useRef, useState } from "react";
import {
  useAccount,
  useConnect,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { BsFillInfoSquareFill } from "react-icons/bs";

import { getUserDomainNames } from "../contract-artifacts/utils/helpers";
import { abi } from "../contract-artifacts/abi";

import { animVariant } from "../utils/anim";
import { extractErrorDetails, parseError } from "../utils/helperFunctions";
import { BsThreeDots } from "react-icons/bs";
import useGetSeletedName from "../Hooks/useGetSeletedName";

function Profile() {
  const { address, isConnected } = useAccount();
  const [domains, setDomains] = useState(null);
  const { connect, connectors, error, isError } = useConnect();
  const { chain } = useNetwork();
  const toastRef = useRef(null);

  const {
    data: txHash,
    isLoading: setNameIsLoading,
    isError: isSetNameError,
    error: setNameError,
    write,
    writeAsync,
  } = useContractWrite({
    address: import.meta.env.VITE_CA,
    abi,
    functionName: "setAssociatedName",
  });

  const {
    data,
    isSuccess,
    isFetching,
    isFetched,

    isError: txIsError,
  } = useWaitForTransaction({
    hash: txHash?.hash,
  });
  const { domainName, refetch } = useGetSeletedName(address);

  const displayMiningTx = () => {
    toastRef.current = toast.loading(
      <p>Tx for selected domain name is being mined, please wait ...</p>
    );
  };

  const updateMining = (isError) => {
    toast.update(toastRef.current, {
      render: (
        <p>
          {isError
            ? `Error while mining tx, something went wrong`
            : `Selected domain name has been updated successfully`}
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
  } else if (txIsError) {
    updateMining(txIsError);
  }

  if (isSetNameError) {
    toast.error(extractErrorDetails(setNameError));
  }

  const handleSelect = (currentId) => {
    const updatedDivs = domains.map((div) => ({
      ...div,
      value: div._id === currentId ? !div.value : false,
    }));
    setDomains(updatedDivs);
  };

  useEffect(() => {
    refetch?.();
  }, [isSuccess]);

  useEffect(() => {
    const getAllDomains = async () => {
      try {
        const fetchedDomains = await getUserDomainNames(address, {
          selectedName: domainName,
          chainId: chain.id,
          network: chain.network,
        });

        // Find the index of the domainName in the fetchedDomains array
        const selectedIndex = fetchedDomains.findIndex(
          (domain) => domain.domainName === domainName
        );

        // Create a copy of the fetchedDomains array
        const sortedDomains = [...fetchedDomains];

        // If domainName is found, move it to the beginning of the array
        if (selectedIndex !== -1) {
          const selectedDomain = sortedDomains.splice(selectedIndex, 1)[0];
          sortedDomains.unshift(selectedDomain);
        }
        // Set the value of 'value' to false for each domain
        const domainsWithDefaultValue = sortedDomains.map((domain) => ({
          ...domain,
          value: false,
        }));

        setDomains(domainsWithDefaultValue);
      } catch (err) {
        err?.response?.status === 404 && setDomains([]);
      }
    };
    getAllDomains();
  }, [address, chain, domainName, isFetched]);

  useEffect(() => {
    !isConnected && connect({ connector: connectors[0] });
    isError && toast.error(parseError(error));
  }, []);

  const handleSelectDomain = async (name) => {
    const args = name?.split(".")[0];
    await writeAsync({
      args: [args],
    });
  };

  return (
    <motion.div
      variants={animVariant}
      initial="begin"
      animate="end"
      transition="transit"
      className=" mt-[70px] md:mt-[100px] px-small md:px-[40px] lg:px-Large rounded-sm"
    >
      <p
        className=" --accent-color text font-extrabold text-3xl md:text-7xl 
        mb-2"
      >
        Profile
      </p>
      <div className=" border-b border-b-priBlue mb-4 md:mb-8">
        <p
          className="  w-max text-priBlue md:font-bold text-lg md:text-2xl 
            border-b-2 border-b-priBlue"
        >
          Domains
        </p>
      </div>

      {/*  RENDERS WHEN THERE'RE IDs LINKED TO WALLET */}
      {domains !== null &&
        isConnected &&
        domains?.length > 0 &&
        domains?.map((i) => (
          <motion.div
            key={i._id}
            className=" relative mb-4 md:p-4 md:mb-8 p-2
                    bg-secondary-color shadow-md "
          >
            <div className=" flex justify-between ">
              <p
                className={` ${
                  i.domainName === `${domainName}` && "font-bold"
                } md:text-2xl`}
              >
                {i.domainName}
              </p>
              {i.domainName === `${domainName}` ? (
                <p className="background-text text-bold text-xl">SELECTED</p>
              ) : (
                <BsThreeDots
                  className=" md:text-2xl cursor-pointer"
                  onClick={() => handleSelect(i._id)}
                />
              )}
            </div>

            <motion.div
              layout
              initial={{
                visibility: "collapse",
              }}
              animate={
                i.value === true
                  ? {
                      height: "100px",
                      marginTop: "10px",
                      visibility: "visible",
                      opacity: "1",
                      // borderTop: "1px solid blue"
                    }
                  : {
                      visibility: "collapse",
                      height: "0px",
                      opacity: "0",
                    }
              }
              transition={{
                ease: "easeIn",
              }}
            >
              <h1 className=" border-t border-priBlue w-max font-semibold">
                Set ID as Controller
              </h1>
              <div className=" flex justify-between items-top">
                <p className=" max-w-[250px] md:max-w-[700px] font-extralight text-[12px] md:text-base  ">
                  Controller gives permission to set your preferred name to send
                  and receive tokens.
                </p>
                <button
                  disabled={setNameIsLoading || !write}
                  className={
                    " bg-priBlue text-white rounded-md md:rounded-lg px-5 md:font-bold py-2 md:px-10 md:py-4 md:hover:bg-blue-500 "
                  }
                  onClick={() => handleSelectDomain(i.domainName)}
                >
                  Set ID
                </button>
              </div>

              <div
                className={
                  " absolute bottom-0 mb-1 md:mb-6 text-red-500 flex gap-2 items-center md:font-semibold md:text-lg"
                }
              >
                <BsFillInfoSquareFill className=" md:text-lg text-red-500" />
                Name Storage, Coming soon
              </div>
            </motion.div>
          </motion.div>
        ))}

      {/*  RENDERS WHEN THERE IS WALLET IS NOT CONNECTED OR
                                            NO ID LINKED TO WALLET */}
      {!isConnected && (
        <div
          className=" text-red-500 flex gap-2 items-center
      font-semibold md:text-lg"
        >
          <BsFillInfoSquareFill className=" md:text-lg text-red-500" />
          Connect Wallet
        </div>
      )}
      {isConnected && domains !== null && domains?.length === 0 && (
        <div>
          <p className=" md:text-xl mb-4 md:mb-8">No linked Wallet ID </p>
          <Link
            to="/"
            className=" bg-priBlue py-2 md:py-4 px-4 md:px-6 md:text-xl 
            font-bold text-white md:hover:bg-blue-500 rounded-md"
          >
            Mint ID
          </Link>
        </div>
      )}
    </motion.div>
  );
}

export default Profile;
